const fs = require('fs');
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.overrides = {
  "@types/node": "^22.14.0"
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Added overrides to package.json');
