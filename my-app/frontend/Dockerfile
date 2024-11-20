# Use the appropriate Node image
FROM node:22-alpine3.19

# Set working directory to /opt/my-app/sergio where package.json is located
WORKDIR /opt/my-app/sergio

# Copy everything from the current directory to /opt/my-app/sergio in the container
COPY ./sergio /opt/my-app/sergio

# Install dependencies in /opt/my-app/sergio
# RUN npm install

# Expose necessary ports
EXPOSE 8081 19000 19001 19002

# Run config.sh before starting the main application
CMD ["npx", "expo", "start"]
