"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Point = require('../../lib/index').Point;
var PointText = require('../../lib/index').PointText;

var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;


// Example
(function() {
  var width = 960,
  height = 1160,
  margins = {top: 20, right: 50, bottom: 20, left: 50};

  var title = "test chart lib"
  var uk = require('json!../data/uk.json');
  var uk_points = topojson.feature(uk, uk.objects.places).features;

  // data should be a MultiLineString
  var data = topojson.feature(uk, uk.objects.places);
  var scale = 1200 * 5;
  var parallels = [50, 60]
  var rotate = [4.4, 0]
  var center = [0, 55.4]
  var translate = [width / 2, height / 2];
  var projection = 'albers';
  var pointRadius = 2;
  var text = function(d) { return d.properties.name; };
  var x = function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; }
  var textAnchor = function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; }

  var proj = projectionFunc({
    projection: projection,
    scale: scale,
    translate: translate,
    parallels: parallels,
    rotate: rotate,
    center: center
  });
  var geo = geoPath(proj, {
    pointRadius: pointRadius
  });

  var pointText = uk_points.map(function(d, i) {
    return (
      <PointText
        key={i}
        data={d}
        projection= {proj}
        text={text}
        x={x}
        textAnchor= {textAnchor}
      />
    )
  })

  ReactDOM.render(
    <Chart
      title= {title}
      width= {width}
      height= {height}
      margins= {margins}
    >
      <Point
        data= {data}
        geoPath= {geo}
      />
      {pointText}
    </Chart>
    , document.getElementById('blank-point')
  )

})()
