var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Chart = require('../../lib/index').Chart;
var Sphere = require('../../lib/index').Sphere;
var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;
var Arc = require('../../lib/index').Arc;

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

  var css = require('./css/arc.css');

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

  var places = {
    HNL: [(-157 - 55 / 60 - 21 / 3600), (21 + 19 / 60 + 07 / 3600)],
    HKG: [(113 +  54 / 60 + 53 / 3600), (22 + 18 / 60 + 32 / 3600)],
    SVO: [(37 + 24 / 60 + 53 / 3600), (55 + 58 / 60 + 22 / 3600)],
    HAV: [(-82 - 24 / 60 - 33 / 3600), (22 + 59 / 60 + 21 / 3600)],
    CCS: [(-66 - 59 / 60 - 26 / 3600), (10 + 36 / 60 + 11 / 3600)],
    UIO: [(-78 - 21 / 60 - 31 / 3600), (0 + 06 / 60 + 48 / 3600)]
  };

  var route = {
    type: "LineString",
    coordinates: [
      places.HNL,
      places.HKG,
      places.SVO,
      places.HAV,
      places.CCS,
      places.UIO
    ]
  };

  var arc = (
    <Arc
      data= {route}
      geoPath= {geo}
    />
  )

  ReactDOM.render(
    <Chart
      title= {title}
      width= {width}
      height= {height}
    >
      <Sphere
        geoPath= {geo}
      />
      {arc}
    </Chart>
    , document.getElementById('blank-sphere')
  )

})()
