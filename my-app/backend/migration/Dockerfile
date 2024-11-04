FROM node:22-alpine3.19

# Install dependencies
RUN apk add --no-cache mariadb-client mariadb-connector-c

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

RUN npm install

# Copy migration files and knexfile
COPY . .

# Command to run migrations
CMD ["node", "src/migrate.js"]
