let webpack = require('webpack');
let isProduction = 'production' === process.env.NODE_ENV;
let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  })
];

module.exports = {
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: !isProduction
        }
      }
    }]
  },
  entry: {
    'promo': './client/promo/promo.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/static/js',
    publicPath: '/static/js/'
  },
  plugins: isProduction ? plugins : [],
  devtool: 'source-map'
};
