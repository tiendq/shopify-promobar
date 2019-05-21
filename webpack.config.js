let webpack = require('webpack');
let isProduction = 'production' === process.env.NODE_ENV;

let vendors = [
  'react',
  'react-dom',
  'react-fastclick',
  '@shopify/polaris',
  'unfetch',
  'validator'
];

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendors', 'manifest']
  })
];

let productionPlugins = [
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
    'edit-promo': './client/edit-promo.js',
    'support': './client/support.js',
    'vendors': vendors
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/static/js',
    publicPath: '/static/js/'
  },
  plugins: isProduction ? plugins.concat(productionPlugins) : plugins,
  devtool: 'source-map'
};
