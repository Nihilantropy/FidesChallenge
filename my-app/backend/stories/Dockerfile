# Use an official Java runtime as a parent image
FROM openjdk:17-jdk-slim

# Install netcat
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
COPY . /app
<<<<<<< HEAD
=======

RUN ./mvnw clean package

COPY ./target/stories-microservice-0.0.1-SNAPSHOT.jar /app/stories-microservice.jar

RUN ./mvnw clean package

COPY ./target/stories-microservice-0.0.1-SNAPSHOT.jar /app/stories-microservice.jar
# Make sure the wait-for-it script is executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN apt-get update && apt-get install -y dos2unix && \
    dos2unix /usr/local/bin/wait-for-it.sh && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8080

# Command to run the application using wait-for-it.sh
ENTRYPOINT ["/usr/local/bin/wait-for-it.sh", "${MYSQL_HOST}", "${MYSQL_PORT}"]
