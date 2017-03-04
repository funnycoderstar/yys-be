const fs = require('fs');
const request = require('request');

const download = function (uri, filename) {
    return new Promise((resolve) => {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
    });

};

module.exports = download;