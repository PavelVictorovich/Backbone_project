var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = {
  // context: __dirname + "/app",
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', './src/index'],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/src/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
        test: /\.(gif|png)$/,
        loader: 'url?limit=1000',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
    ],
  },
  watch: true,
  quiet: true,
};
module.exports = config;
var devServer = new WebpackDevServer(
    webpack(config),
    {
      contentBase: `${__dirname}/dist`,
    }
).listen(3000, 'localhost');