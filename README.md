docker-node-react-events

# A simple events manager
This project uses a React.js app on the front end and a Node.js API with  MongoDB. It is set up to run in a Docker container. It is a very simple application to create and list events.

## Setup (requires Docker)
- download/clone the project
- cd into the project folder and run:
docker-compose up --build

## Running the application
The application runs on http://localhost:3000

To use the application:
- click Login
- click "Create new account" to create a user account with a (fake is fine) email and password.
- login
- create events on the "Events" tab.

## Testing the api
There is a Postman collection to test the api.
The routes are auth protected, so you'll need to create a user before you can access the routes.
- use user/signup to create an account with an email and password
- use user/login to login
- if the login is successful, there will be a token in the response. Use the token to authenticate. 
