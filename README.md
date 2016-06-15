# item-ratings-api
[![node](https://img.shields.io/badge/node-%3E6.2.1-green.svg)](http://node.green/)

### Installation
You will need:
* Node.js above version 6.2.1
* A live Mongo installation with a database
* Your database URI

Clone this repository into its host directory, enter the main directory, and then install dependencies.

`Documents$ git clone git@github.com:pretentiousgit/item-ratings-api.git`
`Documents$ cd item-ratings-api`
`Documents$ npm install`

to install package dependencies.

#### Likely Problems

* Node is out of date
  - Check your version with `node -v`. If it is less than 6.2.1, try to update.
  - install `http://brew.sh`, or update brew using `brew update`, and run `brew upgrade node`

* Your NPM isn't installing all dependencies with a single go-round
  - Remove node-modules and reinstall all your node-modules.
  - hot tip: `npm install && say i am done hal`

* Mongo is not presently running on your system
  - Is mongoDB installed? If not, install it using `brew install mongo`
  - If it is, try typing `mongod` at terminal

#### A Secrets.js file is required at root.
* Rename secretStub.js to secrets.js, and generate an app secret for your application.
* In `database_info:`, enter your database connection string - something like `mongodb://127.0.0.1/ObjectDB`

### Running App
Run the app from the main directory using `node server.js`

### Tests
Tests can be found in the `/test` directory

Test the app using the command `npm test`

Completed and successful tests will generate their own documentation.

### API Documentation
If your tests pass, this app will generate its own documentation automatically. You can find those docs with the server running. They will be located at:
`http://yourURL/docs/`

For a demo on a local machine, this means you'll find your docs at
`http://127.0.0.1:8081/docs/`

### 404 
This API has a 404 message defined, which can be replaced by a JSON message or static HTML page.
