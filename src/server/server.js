'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const commonPaths = require('./files');
const readFile = require('util').promisify(fs.readFile);

const getRandomAnswer = () => {
    if (Math.random() > .5) {
        return readFile(commonPaths.files.json.progress());
    }
    return (Math.random() > .5)
        ? readFile(commonPaths.files.json.success())
        : readFile(commonPaths.files.json.error());
};

app.use('/index.html', express.static(path.join(commonPaths.directories.dist, 'index.html')));
app.use('/index.js', express.static(path.join(commonPaths.directories.dist, 'index.js')));
app.use('/main.css', express.static(path.join(commonPaths.directories.dist, 'main.css')));
app.use('/json', express.static(commonPaths.directories.json));

app.get('/', (request, response) => {
    console.log(request.url);
    readFile(commonPaths.files.index)
        .then((data) => {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        })
        .catch((error) => {
            console.error(error);
            response
                .status(500)
                .send(error.message);
        });
});

app.get('/request', (request, response) => {
    console.log(request.url);
    getRandomAnswer()
        .then(data => {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(data);
            response.end();
        })
        .catch((error) => {
            console.error(error);
            response
                .status(500)
                .send(error.message);
        });
});

console.log(`Starting server at localhost:${ port }`);
app.listen(port);
