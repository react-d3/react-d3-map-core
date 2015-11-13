"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Chart = require('../../lib/index').Chart;
var Polygon = require('../../lib/index').Polygon;
var tileFunc = require('../../lib/index').tileFunc;
var geoPath = require('../../lib/index').geoPath;
var projectionFunc = require('../../lib/index').projection;
var Tile = require('../../lib/index').Tile;


// Example
// http://bl.ocks.org/mbostock/3757132
(function() {
  var width = 960,
  height = 960

  var topodata = require('json!../data/world-50m.json');

  var data = topojson.feature(topodata, topodata.objects.land);
  var scale = (width + 1) / 2 / Math.PI;
  var translate = [width / 2, height / 2];
  var precision = .1;
  var projection = 'mercator';
  var polygonClass = 'polygon-test';

  var proj = projectionFunc({
    projection: projection,
    scale: scale,
    translate: translate,
    precision: precision
  });

  var geo = geoPath(proj);

  var tiles = tileFunc({
    scale: scale * 2 * Math.PI,
    translate: translate,
    size: ([width, height])
  })


  ReactDOM.render(
    <Chart
      width= {width}
      height= {height}
    >
      <Polygon
        width= {width}
        height= {height}
        data= {data}
        geoPath= {geo}
        polygonClass={polygonClass}
      />
      <Tile
        tiles= {tiles}
      />
    </Chart>
    , document.getElementById('blank-tile')
  )

})()
