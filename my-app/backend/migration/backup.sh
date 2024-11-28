#!/bin/bash

# Load environment variables from .env file
set -o allexport
source .env
set +o allexport

# Define variables using environment variables
BACKUP_DIR="/backup"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="$BACKUP_DIR/myapp_db_backup_$TIMESTAMP.sql"
DB_HOST=${MYSQL_HOST}
DB_NAME=${MYSQL_DATABASE}
DB_USER=${MYSQL_USER}
DB_PASSWORD=${MYSQL_PASSWORD}

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Run the backup command
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > "$BACKUP_FILE"

# Check if the backup was successful
if [ $? -eq 0 ]; then
    echo "Backup successful: $BACKUP_FILE"
else
    echo "Backup failed"
    exit 1
fi
