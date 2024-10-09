# Specify the Node.js base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining files
COPY . .

# Expose the port on which the application will run
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
