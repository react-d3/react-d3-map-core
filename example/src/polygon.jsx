var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Chart = require('../../lib/index').Chart;
var Polygon = require('../../lib/index').Polygon;
var projectionFunc = require('../../lib/index').projection;
var geoPath = require('../../lib/index').geoPath;
var Arc = require('../../lib/index').Arc;


// Example
// http://bl.ocks.org/mbostock/3757132
(function() {
  var width = 960,
  height = 960

  var css = require('./css/arc.css');

  var topodata = require('json!../data/world-50m.json');

  // need presimplify
  topojson.presimplify(topodata);
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
    precision: precision,
    simplify: true,
    simplifyArea: 1,
    clip: true,
    bounds: [[0, 0], [width, height/2]]
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
      {arc}
    </Chart>
    , document.getElementById('blank-polygon')
  )

})()
