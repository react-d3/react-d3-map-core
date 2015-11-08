"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Chart = require('../../lib/index').Chart;
var Polygon = require('../../lib/index').Polygon;


// Example
// http://bl.ocks.org/mbostock/3757132
(function() {
  var width = 960,
  height = 960,
  margins = {top: 20, right: 50, bottom: 20, left: 50};

  var title = "test chart lib"
  var topodata = require('json!../data/world-50m.json');

  var data = topojson.feature(topodata, topodata.objects.land);
  var scale = (width + 1) / 2 / Math.PI;
  var translate = [width / 2, height / 2];
  var precision = .1;
  var projection = 'mercator';
  var polygonClass = 'polygon-test';

  ReactDOM.render(
    <Chart
      title= {title}
      width= {width}
      height= {height}
      margins= {margins}
    >
      <Polygon
        width= {width}
        height= {height}
        data= {data}
        projection = {projection}
        scale= {scale}
        translate= {translate}
        precision= {precision}
        polygonClass={polygonClass}
      />
    </Chart>
    , document.getElementById('blank-polygon')
  )

})()
