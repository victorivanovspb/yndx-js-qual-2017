'use strict';

const path = require('path');

const directories = {
    dist: './dist',
    json: './dist/server/json',
};
const files = {
    index: path.join(directories.dist, 'index.html'),
    json: {
        success: (current = directories.json) => path.join(current, 'success.json'),
        error: (current = directories.json) => path.join(current, 'error.json'),
        progress: (current = directories.json) => path.join(current, 'progress.json'),
    }
};

module.exports = {
    directories,
    files,
};
