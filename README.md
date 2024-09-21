# My React Native App

This project is a React Native application designed to allow users to register with a unique nickname and send emoji notifications to other users.

## Getting Started

This guide will help you set up the development environment using Docker.

### Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

### Running the Application

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Nihilantropy/FidesChallenge.git
   ```

### Navigate to the Project Directory

Change to the project directory:

```bash
cd my-app
```

### Build the Docker Image

Build the Docker image using the following command:

```bash
docker-compose build
```

### Start the Docker Container

Start the application in a Docker container:

```bash
docker-compose up
```

### Access the Application

Open your browser and navigate to 'http://localhost:19006' to view the app. You can also use the Expo Go app on your mobile device to scan the QR code displayed in the terminal.

### Development Tips

- Live Reloading: Any changes made in the code will automatically reflect in the app thanks to the volume mounting in the Docker configuration.
- Stopping the Application: To stop the application, press Ctrl + C in the terminal where the Docker container is running.

### Contributing

Feel free to submit issues and pull requests. Contributions are welcome!