# directory-files

Recursively get full absolute paths of all files in a given directory

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

## Installation

```bash
$ npm install directory-files --save
```

## Usage

```javascript
const path = require('path');
const directoryFiles = require('directory-files');

const dir = path.join(__dirname, 'some/folder');
const fileNames = directoryFiles(dir);
for (const fileName of fileNames) {
  console.log(fileName);
}
```

## API

### `directoryFiles(dir)`

Type: `{Function}`

* `{String} dir` - Absolute path to a directory.

Return: `Array{String}` - An array of full absolute paths.
