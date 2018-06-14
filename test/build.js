var path = require('path');
require('../ribot').build({
  target: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'dst'),
  options: {
    template: 'pug',
  },
});