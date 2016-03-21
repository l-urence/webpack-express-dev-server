#!/usr/bin/env node

'use strict';

const Server = require('../src');
const argv = require('yargs').argv;

const server = new Server({
  watch: Boolean(argv.watch)
});

server.run();
