# ---- Build Stage ----
# Use a Node.js LTS Alpine version for the build environment
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock, pnpm-lock.yaml)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# ---- Production Stage ----
# Use a lightweight Nginx image to serve the static files
FROM nginx:1.25-alpine

# Remove default Nginx server configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets from the 'builder' stage to Nginx's webroot
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default HTTP port)
EXPOSE 80

# Start Nginx and keep it in the foreground
CMD ["nginx", "-g", "daemon off;"]
