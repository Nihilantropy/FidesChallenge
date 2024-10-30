# In your expo-service Dockerfile (in ./frontend/sergio)
FROM node:22-alpine3.19

# Set working directory
WORKDIR /opt/my-app

# Copy config.sh script into the container
COPY . /opt/my-app/

# Make config.sh executable
# RUN chmod +x config.sh

RUN npm i
# RUN npm i @expo/ngrok@^4.1.0

# Expose necessary ports
EXPOSE 8081 19000 19001 19002

# Run config.sh before starting the main application
CMD ["npx", "expo", "start"]