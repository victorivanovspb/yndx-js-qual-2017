'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const readFile = require('util').promisify(fs.readFile);

const directories = {
    dist: './dist',
    json: './dist/server/json',
};
const files = {
  index: path.join(directories.dist, 'index.html'),
  json: {
      success: path.join(directories.json, 'success.json'),
      error: path.join(directories.json, 'error.json'),
      progress: path.join(directories.json, 'progress.json'),
    }
};

const getRandomAnswer = () => {
    if (Math.random() > .5) {
        return readFile(files.json.progress);
    }
    return (Math.random() > .5)
        ? readFile(files.json.success)
        : readFile(files.json.error);
};

app.use('/index.html', express.static(path.join(directories.dist, 'index.html')));
app.use('/index.js', express.static(path.join(directories.dist, 'index.js')));
app.use('/main.css', express.static(path.join(directories.dist, 'main.css')));
app.use('/json', express.static(directories.json));

app.get('/', (request, response) => {
    console.log(request.url);
    readFile(files.index)
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
