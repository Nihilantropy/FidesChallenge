# Use the official MySQL image as a base
FROM mysql:8.0.27

# Set the maintainer label (optional)
# LABEL maintainer="youremail@example.com"

# Set environment variables for MySQL root user and database
# These values should ideally be set in the docker-compose.yml using a .env file
ARG MYSQL_DATABASE
ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_USER
ARG MYSQL_PASSWORD

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD

RUN chown -R mysql:root /var/lib/mysql/

# Copy custom SQL scripts to the Docker image (for first-time database setup)
# The scripts placed in this directory will be executed automatically if the database is empty
COPY ./initdb.d/ /docker-entrypoint-initdb.d/

# Ensure the correct permissions for SQL scripts
RUN chmod -R 755 /docker-entrypoint-initdb.d/

# Expose the MySQL default port
EXPOSE 3306

# Start the MySQL service
CMD ["mysqld"]
