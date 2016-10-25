'use strict';

const fs = require('fs');
const path = require('path');

module.exports = directoryFiles;



function directoryFiles (dirPath, opt) {
  dirPath = path.resolve(dirPath);
  opt = opt || {};
  opt.relative = opt.relative || false;

  function find(dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        const result = [];
        const subJobs = [];

        files.forEach(file => {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) {
            subJobs.push(find(fullPath));
          } else {
            result.push(opt.relative?fullPath.replace(dirPath+path.sep,''):fullPath);
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
  return find(dirPath);
}
