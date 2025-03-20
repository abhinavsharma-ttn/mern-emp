# # Use the official image as a parent image
# # Description: Dockerfile for the client side of the MERN stack application

# # Use the official image as a parent image
# FROM node:18.9.1

# # Set the working directory
# WORKDIR /app

# # Copy the file from your host to your current location
# COPY package.json .

# # Run the command inside your image filesystem
# RUN npm install

# # Inform Docker that the container is listening on the specified port at runtime
# EXPOSE 5173

# # Copy the rest of your app's source code from your host to your image filesystem
# COPY . .

# # Run the specified command within the container
# CMD ["npm", "run", "dev"]
   

# Use the official image as a parent image
FROM node:18.9.1

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the app for production
RUN npm run build

# Install a lightweight web server to serve the build
RUN npm install -g serve

# Expose port 80 for production
EXPOSE 5173

# Serve the app on port 80
CMD ["serve", "-s", "dist", "-l", "5173"]
