var fs = require('fs');

var packageJson = require('../package.json');
var copy = require('copy-files');

if (! packageJson) {
  throw new Error('Can\'t find package json');
}

delete packageJson.devDependencies;

copy({
  files: {
    'README.md': './README.md'
  },
  dest: './dist/',
});

fs.writeFile('./dist/package.json', JSON.stringify(packageJson, null, 2));
