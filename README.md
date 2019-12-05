# Why
I run into problems while developing stand-alone es6 JavaScript library.
My lib should work in both browser and node.
I found out that es6 files have to run through a web server to avoid "Cross-Origin" problems.
Found no simple web server that did what I wanted.
webpack-dev-server was to heavy for my simple needs. 

# How to use
* Create a file named ".npmrc" and add:

       registry=https://npm.pkg.github.com/hakanols
* Add "browser-quick-start" and "esm" to your devDependencies in package.json

       "devDependencies": {
         "esm": "^3.2.25",
         "browser-quick-start": "^1.0.0"
       },
* Add to script in package.json. e.g:

       "scripts": {
         "test-browser": "node -r esm browser-quick-start /test/browser/test-quick.html"
       },
* Run "npm install"
* Run "npm run test-browser"
* Optional: Create a script that run "npm run test-browser" to you want to avoid the terminal in the future
