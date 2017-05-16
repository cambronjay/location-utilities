var fs = require('fs');

var packageJson = require('../package.json');
var readme = require('../README.md');

if (! packageJson) {
  throw new Error('Can\'t find package json');
}
if (! readme) {
  throw new Error('Can\'t find readme');
}

delete packageJson.devDependencies;

fs.writeFile('./dist/package.json', JSON.stringify(packageJson, null, 2));
fs.writeFile('./dist/README.md', JSON.stringify(readme, null, 2));