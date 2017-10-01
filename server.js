'use strict';

let fs = require('fs');
let express = require('express');
let app = express();

app.use('/lib', express.static('./lib'));
app.use('/js', express.static('./js/dist'));
app.use('/css', express.static('./css'));
app.use('/json', express.static('./json'));

app.get('/', (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(
        fs.readFileSync('index.html')
    );

    response.end();
});

app.listen(8181);
