# react-d3-map-core

[![Dependency Status](https://gemnasium.com/react-d3/react-d3-map-core.svg)](https://gemnasium.com/react-d3/react-d3-map-core)

react d3 map components for reusability. For now see example for usages.


## Example

#### With webpack build tools

- Polygons

```js
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');
var Chart = require('react-d3-map-core').Chart;
var Polygon = require('react-d3-map-core').Polygon;

function() {
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
}
```

## Components

- Polygon
- Point
- PointText
- Centroid
- ChartContainer
- Graticule
- Mesh
- Svg
- Title

## Export functions

- geoPath
- graticule
- projection


## Install

```
npm install react-d3-map-core
```

## License

Apache 2.0
