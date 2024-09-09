# Use the official Node.js image as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Install TypeScript globally
RUN npm install -g typescript ts-node

# Build the TypeScript code
RUN tsc

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD [ "ts-node", "index.ts" ]
