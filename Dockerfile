FROM node:22-alpine AS base

# Build stage
FROM base AS builder

# Set working directory
WORKDIR /app

# Install packages
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Copy files
COPY . .

# Install dependencies
RUN npm ci

# Clone the repository and preserve git history
RUN git clone --depth 1 https://github.com/RealFascinated/wiki.git /tmp/repo && \
    cp -r /tmp/repo/.git . && \
    rm -rf /tmp/repo

# Build the site
RUN npm run build

# Production stage
FROM base AS prod

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