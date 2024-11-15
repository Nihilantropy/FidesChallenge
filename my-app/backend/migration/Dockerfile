FROM node:22-alpine3.19

# Install required dependencies
RUN apk add --no-cache mariadb-client mariadb-connector-c dos2unix

# Set the working directory
WORKDIR /app

# Copy all necessary files
COPY . .

# Convert line endings in backup.sh for compatibility
RUN dos2unix /app/backup.sh && chmod +x /app/backup.sh

# Install npm dependencies
RUN npm install

# Set the command to run migrations
CMD ["node", "./src/migrate.js"]
