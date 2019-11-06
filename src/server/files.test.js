'use strict';

const fs = require('fs');
const path = require('path');
const files = require('./files').files;

const readFile = require('util').promisify(fs.readFile);

describe('json files', () => {
    it('success.json', (done) => {
        readFile(files.json.success(path.join(__dirname, '/json')))
            .then((data) => {
                expect(data.length).toBeGreaterThan(0);
                done();
            })
            .catch(error => done.fail(error));
    });
});
