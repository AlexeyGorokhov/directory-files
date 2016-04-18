'use strict';

const path = require('path');

const directoryFiles = require('../');

const rootPath = path.join(__dirname, 'a');

directoryFiles(rootPath)
.then((files) => {
  console.dir(files);
})
.catch(err => {
  console.error(err);
});
