# webpack-express-dev-server [![npm version](https://badge.fury.io/js/webpack-express-dev-server.svg)](https://badge.fury.io/js/webpack-express-dev-server)
Make developing server-side rendering web applications with webpack painless. 

* Reuse most of your webpack configuration to bundle server code.
* Run the server in-memory.
* Use `--watch` to auto reload server.
* Works well with [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to bundle client assets.


## Install / Usage

```shell
$ npm install --save-dev webpack-express-dev-server # from npm
$ npm install --save-dev https://github.com/l-urence/webpack-express-dev-server # from github.com
```

The only configuration file you need to create in your project root is the `webpack.server.config.js` file. It should almost look like your `webpack.config.js`.

```javascript
// You may want to install webpack-node-externals to
// exclude node_modules from the server bundle.
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const path = require('path');

module.exports = {
  entry: './src/server/index.js',
  target: 'node',
  context: __dirname,
  externals: [ nodeExternals() ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.scss$/, loader: 'css/locals?module!sass' },
    ],
  },
};
```

Run the following command to start the webpack-express-dev-sever:

```shell
$ node ./node_modules/webpack-express-dev-server/bin/webpack-express-dev-server.js [--watch]
```

or with in your `package.json`:

```json
// ...
scripts: {
  "startdevserver": "webpack-express-dev-server"
}
// ... 
```

and then run:

```shell
$ npm run startdevserver -- [--watch]
```

## Contribution
Pull request are welcome or open an issue if something breaks or  is missing ;).
