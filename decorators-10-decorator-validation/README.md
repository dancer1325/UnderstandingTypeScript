# Note
* Steps to create / build the project
    * `npm init`
        * Creates the package.json
    * `npm install --save-dev lite-server`
        * Install and add to the package.json to the dev section
    * Add script `start` launching the lite-server
    * `tsc --init`
      * Create a 'tsconfig.json'
      * From now, the project is a typescript project
    * Create 'dist' folder
      * folder which stores the output files
* [lite-server](https://www.npmjs.com/package/lite-server)
    * Lightweight development only node server that serves a web app
    * Serves the index.html on a server
    * Refresh the pages each time some change in the code is done
        * But if you change .ts, manually you need to compile again to generate the proper .js
* 'tsconfig.json'
  * 'compilerOptions.experimentalDecorators'
    * boolean to enable support for ES7 decorators

# How to run?
* `npm install`
    * Install all the dependencies
* `tsc--watch` / `tsc -w`
    * Compile all the .ts files to .js
    * Watch changes in .ts files
* `npm start`
    * Run the start script
    * Start up the lite server
        * 'localhost:3000'
            * Output of the server
        * 'localhost:3001'
            * UI of the lite-server
    * Check the chrome debugger console

# How to debug using VSC?
* Steps
  * 'Execute', 'Start depuration'
  * '.vscode' config files are generated
* Problems:
  * Problem1: "You don't have an extension for debugging 'JSON with Comments'"
    * Solution: https://stackoverflow.com/questions/68424936/you-dont-have-an-extension-for-debugging-json-with-comments-warning-when-de
    * Note: Maybe you can have problems with go version
