import fs from 'fs';
import http from 'http';
import path from 'path';
import { spawn } from 'child_process';

// maps file extention to MIME types
// full list can be found here: https://www.freeformatter.com/mime-types-list.html
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf',
};
	
function handleRequest(req, res) {
    console.log(`${req.method} ${req.url}`);

	const baseURL = req.protocol + '://' + req.headers.host + '/';
	const reqUrl = new URL(req.url, baseURL);

    const sanitizePath = path.normalize(reqUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);
   
    if(!fs.existsSync(pathname)) {
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
    }

    if (fs.statSync(pathname).isDirectory()) {
        pathname += '/index.html';
    }

    fs.readFile(pathname, function(err, data){
        if(err){
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            const ext = path.parse(pathname).ext;
            res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
            res.end(data);
        }
    });
}

function open(url) {
    let command;
	switch(process.platform) {
		case 'darwin':
			command = 'open';
			break;
		case 'win32':
			command = 'explorer';
			break;
		case 'linux':
			command = 'xdg-open';
			break;
		default:
			throw new Error('Unsupported platform: ' + process.platform);
	}

	return new Promise(function (resolve, reject) {
		let process = spawn(command, [url]);
	    process.on('close', function (code) {
		    resolve(code);
	    });
	    process.on('error', function (err) {
		    reject(err);
	    });
	});
}

function hashString(text){
  return text
    .split("")
	.reduce(function(a,b){
		a=((a<<5)-a)+b.charCodeAt(0);
		return a&a
	},0);              
}

function createPortNumber(seed){
	const startPort = 49151;
	const endPort = 65535;
	return startPort + Math.abs(seed) % (endPort-startPort);
}

async function start(){
	if (process.argv.length !== 3){
		console.log("Need argument with path to start html file");
		return;
	}
	const subPath = process.argv[2];
	if (!fs.existsSync('.'+subPath)){
		console.log("No file ");
		return;
	}
	const seed = hashString(process.cwd()+subPath);
	const portNumber = createPortNumber(seed);
	const server = http.createServer(handleRequest);
	server.listen(portNumber);
    let url = 'http://127.0.0.1:'+portNumber+subPath;
	await open(url);
}

start();