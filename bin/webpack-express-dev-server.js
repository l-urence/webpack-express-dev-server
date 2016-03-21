#!/usr/bin/env node

'use strict';

const Server = require('../src');
const argv = require('yargs')
  .usage('Usage: webpack-express-dev-server [--watch]')
  .help('h')
  .alias('h', 'help')
  .option('watch', { describe: 'Watch for file changes' })
  .argv;

const server = new Server({
  watch: Boolean(argv.watch)
});

server.run();
