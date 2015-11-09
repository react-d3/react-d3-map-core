"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Point = require('../../lib/index').Point;
var Centroid = require('../../lib/index').Centroid;

var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;

// Example
(function() {
  var width = 960,
  height = 1160;

  var title = "test chart lib"
  var uk = require('json!../data/uk.json');
  var uk_centroid = topojson.feature(uk, uk.objects.subunits).features;

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

  var centroid = uk_centroid.map(function(d, i) {
    return (
      <Centroid
        key={i}
        data={d}
        geoPath= {geo}
        text={text}
      />
    )
  })

  ReactDOM.render(
    <Chart
      title= {title}
      width= {width}
      height= {height}
    >
      <Point
        data= {data}
        geoPath= {geo}
      />
      {centroid}
    </Chart>
    , document.getElementById('blank-centroid')
  )

})()
