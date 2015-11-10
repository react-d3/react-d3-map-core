"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Chart = require('../../lib/index').Chart;
var Point = require('../../lib/index').Point;
var Voronoi = require('../../lib/index').Voronoi;

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

  var x = function(d) { return +proj(d.geometry.coordinates)[0]; }
  var y = function(d) { return +proj(d.geometry.coordinates)[1]; }
  var onMouseOut = function(dom, d, i) {console.log(d, i);}
  var onMouseOver = function(dom, d, i) {console.log(d, i);}


  var points = data.features.map(function(d, i) {
    return (
      <Point
        key= {i}
        data= {d}
        geoPath= {geo}
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
      <Voronoi
        data= {data.features}
        geoPath= {geo}
        x= {x}
        y= {y}
        width= {width}
        height= {height}
        onMouseOut= {onMouseOut}
        onMouseOver= {onMouseOver}
      />
      {points}
    </Chart>
    , document.getElementById('blank-voronoi')
  )

})()
