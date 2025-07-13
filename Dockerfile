# -----------------------------
# Base image with node and libc
# -----------------------------
FROM node:18-alpine AS base

# Install needed system packages
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# -----------------------------
# Dependencies stage
# -----------------------------
FROM base AS deps

# Copy lock files to install only dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY prisma ./prisma/

# Install dependencies depending on lock file
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found." && exit 1; \
  fi

# -----------------------------
# Builder stage
# -----------------------------
FROM base AS builder

# Copy installed deps from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy rest of the app
COPY . .

# Generate Prisma client (if using Prisma)
RUN npx prisma generate

# Build Next.js app
RUN yarn build

# -----------------------------
# Production runtime image
# -----------------------------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use non-root user
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
