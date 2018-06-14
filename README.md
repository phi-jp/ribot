# ribot
riot builder

## usage

```
var ribot = require('ribot')

// build (return ribot instance)
var ribotInstance = ribot.build({
  target: 'src',
  output: 'dst',
  options: {
    template: 'pug',
  },
});

// watch (return ribot instance)
var ribotInstance = ribot.build({
  target: 'src',
  output: 'dst',
  options: {
    template: 'pug',
  },
});

// create instance
var ribotInstance = ribot.create({
  target: 'src',
  output: 'dst',
  options: {
    template: 'pug',
  },
});

// setTemplate
ribotInstance.setTemplate('pug');

// watcher (chokidar)
var watcher = ribotInstance.watcher;
watcher.on('change', (fileName) => {
  console.log(`change: ${fileName}`);
});

```