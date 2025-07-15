# ----------------------------------------
# Base image with Node.js and system libs
# ----------------------------------------
FROM node:18-alpine AS base

# Install compatibility libraries needed for some node modules (e.g., Prisma)
RUN apk add --no-cache libc6-compat openssl

# Set the working directory
WORKDIR /app

# ----------------------------------------
# Install dependencies separately (deps stage)
# ----------------------------------------
FROM base AS deps

# Copy package files for npm install
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies using npm ci for reproducible builds
RUN npm ci

# ----------------------------------------
# Build the application (builder stage)
# ----------------------------------------
FROM base AS builder

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all other application files
COPY . .

# Generate Prisma client code
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# ----------------------------------------
# Prepare final production image (runner)
# ----------------------------------------
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user for better security
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy standalone server build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use the non-root user
USER nextjs

# Expose the app port
EXPOSE 3000

# Start the server using Next.js standalone server.js
CMD ["node", "server.js"]
