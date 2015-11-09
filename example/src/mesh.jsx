"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('../../lib/index').Chart;
var Mesh = require('../../lib/index').Mesh;
var topojson = require('topojson');
var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;


// Example
// http://bl.ocks.org/mbostock/3757132
(function() {
  var width = 960,
  height = 1160;

  var title = "test chart lib"
  var topodata = require('json!../data/world-50m.json');

  // data should be a MultiLineString
  var data = topojson.mesh(topodata, topodata.objects.countries, function(a, b) { return a !== b; });
  var scale = (width + 1) / 2 / Math.PI;
  var translate = [width / 2, height / 2];
  var precision = .1;
  var projection = 'mercator';

  var proj = projectionFunc({
    projection: projection,
    scale: scale,
    translate: translate,
    precision: precision
  });
  var geo = geoPath(proj);


  ReactDOM.render(
    <Chart
      title= {title}
      width= {width}
      height= {height}
    >
      <Mesh
        width= {width}
        height= {height}
        data= {data}
        geoPath= {geo}
      />
    </Chart>
    , document.getElementById('blank-mesh')
  )

})()
