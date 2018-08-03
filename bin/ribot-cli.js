#!/usr/bin/env node
const argv = require('argv');
const path = require('path');

argv.option([
  {
    name: 'template',
    short: 't',
    type: 'string',
    description: 'テンプレートエンジンを指定してください',
    example: "`ribot src dst --template=pug` or `ribot src dst -t pug`",
  },
  {
    name: 'watch',
    short: 'w',
    type: 'boolean',
    description: '監視をする場合に指定してください',
    example: "`ribot src dst --watch` or `ribot src dst -w`",
  },
]);

argv.description = 'Usage: ribot.js <src_dir> <dst_dir> [options]';

const { targets, options } = argv.run();

if (targets.length < 2) {
  console.log([
    '対象ディレクトリと出力ディレクトリを指定してください',
    '出力ディレクトリを指定してください',
  ][targets.length]);
  argv.help();
  process.exit(1);
}
const [target, output] = targets.map(target => path.resolve(target));
const ribot = require('../ribot').create({ target, output });
if (options.template) {
  ribot.setTemplate(options.template);
}
if (options.watch) {
  ribot.watch().watcher.on('change', (file) => {
    console.log(`change: ${file}`);
  });
}
else {
  ribot.build();
}