
'use strict';

var path = require('path'),
  webpack = require('webpack'),
  nodeModulesPath = path.join(__dirname, 'node_modules');

// 0 stands for development, 1 stands for production
// for development mode: NODE_ENV=0 webpack
// for production mode: NODE_ENV=1 webpack
var ENV = !!(+process.env.NODE_ENV || 0);


module.exports = [{
  name: 'react-d3-map-core-example-es5',
  devtool: ENV ? "source-map": '',
  entry: {
    container: './example/src/container.jsx',
    polygon: './example/src/polygon.jsx',
    mesh: './example/src/mesh.jsx',
    graticule: './example/src/graticule.jsx',
    map: './example/src/map.jsx',
    point: './example/src/point.jsx',
    centroid: './example/src/centroid.jsx',
    voronoi: './example/src/voronoi.jsx',
    sphere: './example/src/sphere.jsx',
    tooltip: './example/src/tooltip.jsx',
    tile: './example/src/tile.jsx',
    vectortile: './example/src/vectortile.jsx',
    arc: './example/src/arc.jsx',
    popup: './example/src/popup.jsx',
    zoom: './example/src/zoom.jsx',
    zoom2: './example/src/zoom2.jsx'
  },

  output: {
    path: path.join(__dirname, './example/dist'),
    filename: ENV ? '[name].min.js': '[name].js'
  },

  module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        loaders: ["jsx-loader"],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
}];
