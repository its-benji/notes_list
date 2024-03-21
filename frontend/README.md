# Frontend README
## Overview
### This README provides an overview of the frontend directory structure and files used in this project. The frontend is built using React.

## Directory Structure
The frontend directory is located at frontend/src and includes the following files and folders:

App.css: CSS file for styling the main App component.
App.js: The main component that contains the connections to the backend for GET, POST, and DELETE operations.
##### Components: A folder containing smaller components used in the application.
CreateNote: A form component responsible for adding new notes.
Note: A component for displaying individual notes.
RemoveNote: A button component used for removing notes.
styles.css: A CSS file containing styles for the components.

## Components
### App Component
The App component is the main component of the application. It handles the connections to the backend server for performing CRUD operations on notes.

##### CreateNote Component
The CreateNote component is a form component used for adding new notes to the application. It includes fields for entering the title and content of the note. It also has two buttons, one to create a new note, and the other to save it once values have been added.

##### Note Component
The Note component is responsible for displaying individual notes in the application. It renders the title and content of each note and includes functionality for expanding and collapsing the note, as well as a button to delete the note.

##### RemoveNote Component
The RemoveNote component is a button component used for removing notes from the application. It is attached to each note and triggers the deletion of the corresponding note when clicked.

### Technologies Used
React, CSS, Javascript

### Usage
To run the frontend of the application, navigate to the frontend directory and execute the appropriate commands (e.g., npm start). Ensure that the backend server is running to enable communication between the frontend and backend.

If you prefer to run the frontend in a Docker container:

Build the Docker image: docker build -t frontend .

Run the Docker container: docker run --rm -dp 3000:3000 frontend

Once the frontend is running, it will be accessible at http://localhost:3000.


### Design Decisions:

#### Decisions: 

##### Component Structure
I like to keep things organized and as small as possible (without harming functionality). I tried to make a separate component file for each of the smaller components, which are organized into the "components" folder. 

##### React Hooks   
I used several different useStates to "open/close" UI elements, and to switch some icons (like the open/close chevrons). I used one useEffect to handle the "fetch" for notes from the backend.

##### .cvs file for "database"
I opted to use the .cvs for the "database." Honestly, I kind-of wish I'd gone with SQLite or another database. I ran into some issues with an "empty file," and the way I accessed data to delete it felt a bit jenky. 

##### Further Considerations:
Although I didn't go into these (due to the simplicity of the app), these would be further considerations I would explore if I continued working with this: 

Security: I would update cors to a single point of origin and restrict the API endpoints to prevent XSS. If I was using a database, I'd also want to ensure I was utilizing data sanitization. 

Testing: I'd want to do a series of tests for this - unit tests for the individual functions as well as some end-to-end testing.

#### Challenges: 

3 Challenges I came across: 

##### Firewall Blocking Access
Halfway through the project, I was suddenly unable to access my webapp on localhost. I did a bunch of troubleshooting, and eventually realized that my firewall was blocking it

##### Missed "Sync" on ReadFile
In the backend, I initially missed one of the "Sync"s on one of my ReadFiles, and it took me a while to figure out that the code wasn't asynchronous (and therefore wasn't completing the read before returning)

##### Plaintext data transfer in handleSubmit()
Initially, when trying to POST data to the backend, I didn't include 

headers: { 'content-type': 'application/json'}

This meant that the data was being sent back as plaintext (I think...?) instead of JSON data, resulting in the data being "undefined." It took me a while of troubleshooting to realize that.  


