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

# Copy any custom SQL scripts or configurations (if needed)
# This can be useful for setting up initial databases or seeding data
# Place your .sql files in backend/db/initdb.d and they will be automatically loaded
COPY ./initdb.d /docker-entrypoint-initdb.d
RUN chmod -R 777 /docker-entrypoint-initdb.d/

RUN chown -R mysql:root /docker-entrypoint-initdb.d/

# Set a custom configuration (optional)
# If you need custom MySQL configurations, add them to backend/db/my.cnf
# COPY ./my.cnf /etc/mysql/my.cnf

# Expose the MySQL default port
EXPOSE 3306

# Start the MySQL service
CMD ["mysqld"]
