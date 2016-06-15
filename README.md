# item-ratings-api
[![node](https://img.shields.io/node/v/gh-badges.svg?maxAge=2592000)]()
[]()
[]()


### Installation
You will need:
* Node.js
* A live Mongo installation with a database
* Your database URI

Clone this repository into its host, enter the main directory, and then run
`npm install`

to install package dependencies.

####Secrets:
Rename secretStub.js to secrets.js, and generate an app secret for your application.
In `database_info:`, enter your database connection string - something like `mongodb://127.0.0.1/ObjectDB`

### Running App
Run the app from the main directory using node server.js

### Tests
Tests can be found in the `/test` directory

Test the app using the command `npm test`

Completed, successful tests will generate their own documentation.

### API Documentation
If your tests pass, this app will generate its own documentation automatically. You can find those docs with the server running. They will be located at:
`http://yourURL/docs/`

For a demo on a local machine, this means you'll find your docs at
`http://127.0.0.1:8081/docs/`

### 404 
This API has a 404 message defined, which can be replaced by a JSON message or static HTML page.