# Backend for Note-Making App
## Overview
This repository contains the backend code for a note-making application. The backend is responsible for handling CRUD (Create, Read, Update, Delete) operations on notes stored in a CSV file. Tech-stack includes: Node.js, Express.

## Files Included
### Dockerfile: 
Defines the instructions to build a Docker image for the backend application. The Dockerfile ensures that the backend can be run in a Docker container with all dependencies and configurations.

### .dockerignore: Specifies the files and directories to be ignored when building a Docker image. In this case, node_modules is excluded to optimize the build process.

### noteData.csv: Contains the data for notes stored in CSV format. The backend reads from and writes to this file to manage note data.

## Running the Backend
To run the backend locally or in a Docker container:

Start the backend server by running npm start.

If you prefer to run the backend in a Docker container:

Build the Docker image: docker build -t backend .

Run the Docker container: docker run --rm -dp 5000:5000 backend

Once the backend is running, it will be accessible at http://localhost:5000.

### API Endpoints
The backend exposes the following API endpoints:

GET /notes: Retrieves all notes stored in the database.

POST /notes: Creates a new note based on the provided data.

DELETE /notes/:id: Deletes the note with the specified ID.

## Contributors
Benjamin Ward

