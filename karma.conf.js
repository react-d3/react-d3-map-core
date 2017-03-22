var path = require('path');

module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: ['Chrome'],
    // singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { 
            test: /\.jsx?$/,         // Match both .js and .jsx files
            exclude: /node_modules/, 
            loader: "babel-loader"
          }
        ]
      },
      resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
