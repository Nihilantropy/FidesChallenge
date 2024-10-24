# Use a Java base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven dependencies (cached)
COPY target/stories-microservice-0.0.1-SNAPSHOT.jar /app/stories-microservice.jar

# Expose the port on which the app runs
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "stories-microservice.jar"]
