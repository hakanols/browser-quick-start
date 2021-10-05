# Why
I run into problems while developing stand-alone es6 JavaScript library.
My lib should work in both browser and node.
I found out that es6 files have to run through a web server to avoid "Cross-Origin" problems.
Found no simple web server that did what I wanted.
webpack-dev-server was to heavy for my simple needs. 

# How to use
## NPM

* Add "browser-quick-start" devDependencies in package.json

       "devDependencies": {
         "browser-quick-start": "^1.0.1"
       },
* Ckeck package.json that this is included

       "type": "module",      

* Add to script in package.json. e.g:

       "scripts": {
         "test": "node node_modules/browser-quick-start /test/index.html"
       },
* Run "npm install"
* Run "npm run test"
* Optional: Create a script that run "npm run test-browser" to you want to avoid the terminal in the future

## Raw
Copy "browser-quick-start.js" to your repo and run with "node browser-quick-start.js {path to file to run}"
