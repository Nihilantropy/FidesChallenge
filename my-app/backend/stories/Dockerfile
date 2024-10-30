# Use a Java base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy only the pom.xml and Maven wrapper for dependency caching
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn

# Download dependencies (this layer will be cached)
RUN ./mvnw dependency:go-offline

# Copy the entire project
COPY . .

# Package the application
RUN ./mvnw clean package -DskipTests

# Expose the port on which the app runs
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "target/stories-microservice-0.0.1-SNAPSHOT.jar"]
