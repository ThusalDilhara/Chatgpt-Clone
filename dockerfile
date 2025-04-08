# Stage 1: Build the React app using Node.js
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source files
COPY . .

# Build the React app
RUN npm run build


# Stage 2: Serve the app using Nginx
FROM nginx:1.23-alpine

# Remove the default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build from the build stage to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]

