# Note
* Steps to create / build the project
  * `npm init` 
    * Creates the package.json
  * `npm install --save-dev lite-server`
    * Install and add to the package.json to the dev section
  * Add script `start` launching the lite-server
* [lite-server](https://www.npmjs.com/package/lite-server)
  * Lightweight development only node server that serves a web app
  * Serves the index.html on a server
  * Refresh the pages each time some change in the code is done
    * But if you change .ts, manually you need to compile again to generate the proper .js
* Truthy and Falsy values
  * Values which are considered boolean in a boolean context
  * `node truthyorfalsy.js`
    * Execute the .js

# How to run?
* `npm install`
  * Install all the dependencies
* `tsc app.ts`
  * Compile .ts file to .js
* `npm start`
  * Run the start script
  * Start up the lite server
    * 'localhost:3000'
      * Output of the server
    * 'localhost:3001'
      * UI of the lite-server
  * Check the chrome debugger console