# Why
I run into problems while developing a stand-alone es6 JavaScript library for multiplattform browser and node.
I found out that es6 files have to run through a web server to avoid "Cross-Origin" problems.
Found no simple web server that did what I wanted. webpack-dev-server was to heavy for my simple needs.
Developed this tool that starts a webserver on localhost on a pseudorandom port and open a browser to that page.
All with no dependencies except NodeJS

# How to use
### Raw
Copy "browser-quick-start.js" to your repo and run with ("/test/example.html" is the page you want to open.)

    node browser-quick-start.mjs /test/example.html
    
### NPM

* Add "browser-quick-start" devDependencies in package.json

       "devDependencies": {
         "browser-quick-start": "^1.1.2"
       },
  
* Add to script in package.json. ("/test/example.html" is the page you want to open.)

       "scripts": {
         "test": "browser-quick-start /test/example.html"
       },
       
* Run "npm install"
* Run "npm run test"


