# Use the official MySQL image as a base
FROM mysql:8.0.27

# Set the maintainer label (optional)
# LABEL maintainer="youremail@example.com"

# Ensure the /etc/mysql/mysql.conf.d directory exists

RUN mkdir -p /etc/mysql/mysql.conf.d

# Copy custom SQL scripts to the Docker image (for first-time database setup)
# The scripts placed in this directory will be executed automatically if the database is empty
COPY ./initdb.d/ /docker-entrypoint-initdb.d/

# Ensure the correct permissions for SQL scripts
RUN chmod -R 755 /docker-entrypoint-initdb.d/

# Create a directory for logs
RUN mkdir -p /var/log/mysql && chown -R mysql:mysql /var/log/mysql
RUN chown -R mysql:mysql /var/lib/mysql /var/log/mysql

# Copy custom MySQL configuration to the container
COPY my.cnf /etc/mysql/conf.d/

# Set permissions for the configuration files
RUN chmod 644 /etc/mysql/conf.d/my.cnf

# Expose the MySQL default port
EXPOSE 3306

# Start the MySQL service
ENTRYPOINT ["docker-entrypoint.sh"]
RUN ["mysqld"]
