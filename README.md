# Why
I run into problems while developing a stand-alone es6 JavaScript library for multiplattform browser and node.
I found out that es6 files have to run through a web server to avoid "Cross-Origin" problems.
Found no simple web server that did what I wanted. webpack-dev-server was to heavy for my simple needs.
Developed this tool that starts a webserver on localhost on a pseudorandom port and open a browser to that page.
All with no dependencies except NodeJS v12.
Should work on Windows, Linux and MAC.

# How to use

### Standalone
* Just add copy browser-quick-start.mjs to your project and run with node. E.g.

       node browser-quick-start.mjs /test/hello.html

### NPM

* Add "browser-quick-start" devDependencies in package.json

       "devDependencies": {
         "browser-quick-start": "^1.1.4"
       },
  
* Add to script in package.json. E.g.

       "scripts": {
         "test": "browser-quick-start /test/hello.html"
       },
       
* Run "npm install"
* Run "npm run test"
