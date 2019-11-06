'use strict';

const fs = require('fs');
const path = require('path');
const files = require('./files').files;

const readFile = require('util').promisify(fs.readFile);

describe('json files', () => {
    const pathJson = path.join(__dirname, '/json');

    it('success.json', (done) => {
        readFile(files.json.success(pathJson))
            .then((data) => {
                expect(data.length).toBeGreaterThan(0);
                done();
            })
            .catch(error => done.fail(error));
    });

    it('error.json', (done) => {
        readFile(files.json.error(pathJson))
            .then((data) => {
                expect(data.length).toBeGreaterThan(0);
                done();
            })
            .catch(error => done.fail(error));
    });

    it('progress.json', (done) => {
        readFile(files.json.progress(pathJson))
            .then((data) => {
                expect(data.length).toBeGreaterThan(0);
                done();
            })
            .catch(error => done.fail(error));
    });
});
