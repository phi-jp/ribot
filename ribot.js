const fs = require('fs');
const path = require('path');
const riot = require('riot');
const chokidar = require('chokidar');
const colors = require('colors/safe');
const moment = require('moment');

class Ribot {
  constructor(config) {
    this.setConfig(config);
    this.files = {};
  }
  
  setConfig(config) {
    this.config = {};
    config = config || {};
    this.config.output = config.output || '.';
    this.config.options = config.options || {};
    this.config.target = config.target || '.';
    return this;
  }

  setTemplate(template) {
    this.config.options.template = template;
    return this;
  }

  getTemplate() {
    return this.config.options.template;
  }

  log(message) {
    console.log(`[${colors.gray(moment().format('hh:mm:ss'))}] ${message}`);
    return this;
  }

  error(message) {
    console.error(`[${colors.gray(moment().format('hh:mm:ss'))}] ${colors.red(message)}`);
    return this;
  }

  removeAll() {
    this.files = {};
    return this;
  }

  compile(file) {
    const code = fs.readFileSync(file, 'utf8').toString();
    try {
      const js = riot.compile(code, this.config.options);
      this.files[file] = js;
    }
    catch (e) {
      this.error(`${colors.red('compile failed:')} ${colors.cyan(file)}\n${colors.red(e.toString())}`);
    }
  }

  remove(file) {
    delete this.files[file];
  }

  build() {
    this.log(`Starting ${colors.cyan('Build')}`);
    this.removeAll();
    const watcher = this.createWatcher()
      .on('add', this.compile.bind(this))
      .once('ready', () => {
        this.output();
        watcher.close();
      });
    return this;
  }

  output() {
    fs.writeFileSync(path.join(this.config.output, 'tags.js'), Object.keys(this.files).map(file => this.files[file]).join('\n'));
    this.log(`output ${colors.green('tags.js')}`);
  }

  createWatcher() {
    return chokidar.watch(this.config.target, {
      ignored: /[\/\\]\./,
      persistent: true,
    });
  }

  watch() {
    this.removeAll();

    if (this.watcher) {
      this.unwatch();
    }

    const watcher = this.watcher = this.createWatcher();

    watcher
      .on('add', this.compile.bind(this))
      .on('change', this.compile.bind(this))
      .on('unlink', this.remove.bind(this))
      .once('ready', () => {
        this.log(colors.cyan('監視開始'));
        this.output();
        watcher.on('all', this.output.bind(this));
      });
    
    return this;
  }

  close() {
    this.watcher && this.watcher.close();
    this.watcher = null;
    return this;
  }
}

const builder = module.exports = {
  create(config) {
    return new Ribot(config);
  },

  watch(config) {
    return builder.create(config).watch();
  },

  build(config) {
    return builder.create(config).build();
  }
};

