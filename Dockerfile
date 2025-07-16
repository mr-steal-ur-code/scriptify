FROM node:18-alpine

# Install compatibility libraries needed for some node modules (e.g., Prisma)
RUN apk add --no-cache libc6-compat openssl

# Set the working directory
WORKDIR /app

# Set environment to development
ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy package files for npm install
COPY package.json package-lock.json ./

# Copy Prisma schema and seed file
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies for development)
RUN npm ci

# Copy all application files
COPY . .

# Expose the app port
EXPOSE 3000

# Default command runs the development server
# You can override this in docker-compose to run setup-db.sh first
CMD ["npm", "run", "dev"]