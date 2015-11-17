"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Chart = require('../../lib/index').Chart;
var Polygon = require('../../lib/index').Polygon;
var tileFunc = require('../../lib/index').tileFunc;
var geoPath = require('../../lib/index').geoPath;
var projectionFunc = require('../../lib/index').projection;
var VectorTile = require('../../lib/index').VectorTile;

// Example
(function() {
  var width = 960,
  height = 960

  var css = require('./css/vectortile.css')

  var scale = (1 << 21);
  var translate = [width / 2, height / 2];
  var center = [-100.4183, 57.7750];
  var projection = 'mercator';

  var proj = projectionFunc({
    projection: projection,
    scale: scale / 2 / Math.PI,
    translate: translate,
    center: center
  });

  var geo = geoPath(proj);

  var tiles = tileFunc({
    scale: proj.scale() * 2 * Math.PI,
    translate: proj([0, 0]),
    size: ([width, height])
  })

  var tiles = tiles.map((d, i) => {
    return (
      <VectorTile
        key= {i}
        vectorTiles= {d}
        layers= 'all'
        geoPath= {geo}
      />
    )
  })


  ReactDOM.render(
    <Chart
      width= {width}
      height= {height}
    >
      {tiles}
    </Chart>
    , document.getElementById('blank-vectortile')
  )

})()
