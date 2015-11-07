"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('../../lib/index').Chart;
var Graticule = require('../../lib/index').Graticule;
var topojson = require('topojson');

// Example
// http://bl.ocks.org/mbostock/3757132
(function() {
  var width = 960,
  height = 1160,
  margins = {top: 20, right: 50, bottom: 20, left: 50};

  var title = "test chart lib"
  var topodata = require('json!../data/world-50m.json');

  var data = topojson.mesh(topodata, topodata.objects.countries, function(a, b) { return a !== b; });
  var scale = (width + 1) / 2 / Math.PI;
  var translate = [width / 2, height / 2];
  var precision = .1;
  var projection = 'mercator';

  ReactDOM.render(
    <Chart
      title= {title}
      width= {width}
      height= {height}
      margins= {margins}
    >
      <Graticule
        projection = {projection}
        scale= {scale}
        translate= {translate}
        precision= {precision}
      />
    </Chart>
    , document.getElementById('blank-graticule')
  )

})()
