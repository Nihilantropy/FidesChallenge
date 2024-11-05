# Use the official Python base image from Docker Hub
FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /app

COPY . .

# Install any dependencies if a requirements file is provided (uncomment if you have one)
RUN pip install gtts flask flask_cors

EXPOSE 5000

# Default command (optional)
CMD ["python3", "tts_server.py"]