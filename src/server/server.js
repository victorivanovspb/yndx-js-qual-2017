'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const data = {
    index: fs.readFileSync('./dist/index.html')
};

const getRandomAnswer = ((dirname) => {
    const answers = {
        success: fs.readFileSync(path.join(dirname, `success.json`)),
        error: fs.readFileSync(path.join(dirname, `error.json`)),
        progress: fs.readFileSync(path.join(dirname, `progress.json`))
    };
    return () => {
        if (Math.random() > .5) {
            return answers.progress;
        }
        return (Math.random() > .5) ? answers.success : answers.error;
    };
})('./dist/server/json/');

app.use('/index.html', express.static('./dist/index.html'));
app.use('/index.js', express.static('./dist/index.js'));
app.use('/main.css', express.static('./dist/main.css'));
app.use('/json', express.static('./dist/server/json'));

app.get('/', (request, response) => {
    console.log(request.url);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data.index);
    response.end();
});

app.get('/request', (request, response) => {
    console.log(request.url);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(getRandomAnswer());
    response.end();
});

console.log(`Starting server at localhost:${ port }`);
app.listen(port);
