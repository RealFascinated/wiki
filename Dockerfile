FROM node:22-alpine as BASE

# Build stage
FROM BASE AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the site
RUN npm run build

# Production stage
FROM BASE AS prod

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/docusaurus.config.ts ./docusaurus.config.ts
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "run", "serve"] 