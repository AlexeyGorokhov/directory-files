'use strict';

const fs = require('fs');
const path = require('path');

module.exports = directoryFiles;

function directoryFiles (dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const result = [];
      const subJobs = [];

      files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
          subJobs.push(directoryFiles(fullPath));
        } else {
          result.push(fullPath);
        }
      });

      Promise.all(subJobs)
      .then(otherFiles => {
        otherFiles.forEach(otherFile => {
          Array.prototype.push.apply(result, otherFile);
        });
        resolve(result);
      }, err => {
        reject(err);
      });
    });
  });
}
