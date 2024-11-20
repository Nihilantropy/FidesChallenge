#!/usr/bin/env bash
# Use this script to wait for a service to be available.

set -e

TIMEOUT=1500
WAITFORIT=0

# Use the environment variables directly
MYSQL_HOST=${MYSQL_HOST:-"localhost"}  # Fallback to localhost if not set
MYSQL_PORT=${MYSQL_PORT:-"3306"}        # Fallback to 3306 if not set

while [[ "$WAITFORIT" -lt "$TIMEOUT" ]]; do
  if nc -z "$MYSQL_HOST" "$MYSQL_PORT"; then
    echo "$MYSQL_HOST:$MYSQL_PORT is available."
    exec ./mvnw spring-boot:run
    #exec java -jar /app/stories-microservice.jar # Execute the command as separate arguments
    exit 0
  fi
  WAITFORIT=$((WAITFORIT + 1))
  echo "Waiting for $MYSQL_HOST:$MYSQL_PORT... ($WAITFORIT seconds elapsed)"
  sleep 1
done

echo "Timeout waiting for $MYSQL_HOST:$MYSQL_PORT"
exit 1
