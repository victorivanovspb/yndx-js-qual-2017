'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const getResultName = () => {
    if (Math.random() > .5) {
        return 'progress';
    }
    return (Math.random() > .5) ? 'success' : 'error';
};

app.use('/index.html', express.static('./dist/index.html'));
app.use('/index.js', express.static('./dist/index.js'));
app.use('/main.css', express.static('./dist/main.css'));
app.use('/json', express.static('./dist/server/json'));

app.get('/', (request, response) => {
    console.log(request.url);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(
        fs.readFileSync('./dist/index.html')
    );
    response.end();
});

app.get('/json', (request, response) => {
    console.log(request.url);

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(
        fs.readFileSync(`./dist/server/json/${ getResultName() }.json`)
    );
    response.end();
});

console.log(`Starting server at localhost:${ port }`);
app.listen(port);
