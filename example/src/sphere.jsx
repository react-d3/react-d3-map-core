"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Chart = require('../../lib/index').Chart;
var Sphere = require('../../lib/index').Sphere;
var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;

// Example
// http://bl.ocks.org/mbostock/3757132
(function() {
  var width = 960,
  height = 720;

  var title = "test chart lib"
  var topodata = require('json!../data/world-50m.json');

  // data should be a MultiLineString
  var dataCountries = topojson.mesh(topodata, topodata.objects.countries, function(a, b) { return a !== b; });
  var dataLand = topojson.feature(topodata, topodata.objects.land);

  var scale = height / 2.1;
  var translate = [width / 2, height / 2];
  var clipAngle = 90;
  var precision = .5;
  var projection = 'orthographic';

  var proj = projectionFunc({
    projection: projection,
    scale: scale,
    translate: translate,
    clipAngle: clipAngle,
    precision: precision
  });
  var geo = geoPath(proj);

  ReactDOM.render(
    <Chart
      title= {title}
      width= {width}
      height= {height}
    >
      <Sphere
        geoPath= {geo}
      />
    </Chart>
    , document.getElementById('blank-sphere')
  )

})()
