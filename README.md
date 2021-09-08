# Backend's bike shop for Node.js
This repository contains a sample backend code that demonstrates how to generate JWT and how user can login and register and see her/his profile, products and order them.

# Pre-requisites
- NodeJS version 14
- MongoDB version 4

# Set up and run
Clone the repository from GitHub:
```
$ git clone https://github.com/swandevagency/bikeshop.git
```
Install dependencies:
```
cd <project_name> //like: server
npm install
```
# You should create .env file
In main root of project create .env  file and set below parameters:
               
# Project Structure
The folder structure of this app is explained below:
  
  | Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **controllers**                 | Controllers define functions to serve various express routes. |
| **node_modules**         | Contains all npm dependencies.  |
| **middleware**                  | Express middlewares which process the incoming requests before handling them down to the route and here contains JWT verification function.   |
| **models**        | Models define schemas that will be used in storing and retrieving data from Application database. |
| **routes**        | Contain all express routes, separated by module/area of application. |
| **package.json**        | Contains npm dependencies as well as build scripts. |
| **uploads**        | Contains images of blogs that uploaded by users. |
| **app.js**        | Main file that contains server information and should not be deleted or route changes. |

# Build and run the project
```
nodemon
```

# License
This library is released under ISC License.

# Support
Our developer support team is here to help you.
  
You can find us on [Slack](https://swan-agency.slack.com/archives/C025S62527N) or send us email support@swan-agency.com.
	
Also complete documentation can be found in [here](https://swandevagency.atlassian.net/wiki/spaces/TFBPP/pages).
