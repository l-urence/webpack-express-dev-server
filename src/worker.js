'use strict';

const vm = require('vm');
const path = require('path');

function vmRequire(module) {
  const nodeModules = path.resolve('node_modules');
  return require(path.resolve(nodeModules, module));
}

process.on('message', function (message) {
  if (message === 'EXIT') {
    process.exit(0);
  } else if (message !== '') {
    const program = new vm.Script(message);
    program.runInNewContext({
      console: console,
      process: process,
      require: vmRequire,
    });
  }
});
