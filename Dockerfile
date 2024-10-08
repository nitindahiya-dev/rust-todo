# Use the official Node.js 18 image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on (change this if your app runs on a different port)
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
