FROM node:22-alpine AS builder

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
FROM nginx:alpine

# Create nginx log directory and set permissions
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chmod 755 /var/log/nginx

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 