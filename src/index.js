'use strict';

const MemoryFS = require('memory-fs');
const cluster = require('cluster');
const path = require('path');
const webpack = require('webpack');

const config = require(path.resolve('webpack.server.config'));

function killWorkers(workers) {
  for (var workerIdx in workers) {
    if ({}.hasOwnProperty.call(workers, workerIdx)) {
      const worker = workers[workerIdx];
      worker.send('EXIT');
      worker.destroy();
    }
  }
}

const Server = function (options) {
  const worker = path.resolve(__dirname, 'worker.js');
  cluster.setupMaster({ exec: worker, silent: false });

  this.fs = new MemoryFS();
  this.compiler = webpack(config);
  this.compiler.outputFileSystem = this.fs;

  if (options) {
    this.watch = Boolean(options.watch);
  }
};

Server.prototype.run = function () {
  function compilerCb(err, stats) {
    if (err) {
      return console.error(err);
    }

    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
      return console.error(jsonStats.errors);
    }

    if (jsonStats.warnings.length > 0) {
      return console.warn(jsonStats.warnings);
    }

    // If there are any previous running
    // worker shout them down.
    killWorkers(cluster.workers);

    const worker = cluster.fork();
    if (worker.isConnected()) {
      const bundel = path.join(config.output.path, config.output.filename);
      const js = this.fs.readFileSync(bundel);
      worker.send(js.toString());
    }
  }

  if (this.watch) {
    this.compiler.watch({}, compilerCb.bind(this));
  } else {
    this.compiler.run(compilerCb.bind(this));
  }
};

module.exports = Server;
