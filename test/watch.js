var path = require('path');
require('../ribot').create({
  target: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'dst'),
}).setTemplate('pug').watch().watcher.on('change', (file) => {
  console.log(`change: ${file}`);
});