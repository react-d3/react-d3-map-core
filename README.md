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
var projectionFunc = require('react-d3-map-core').projection;
var geoPath = require('react-d3-map-core').geoPath;

(function() {
  var width = 960,
  height = 960

  var topodata = require('json!../data/world-50m.json');

  var data = topojson.feature(topodata, topodata.objects.land);
  var scale = (width + 1) / 2 / Math.PI;
  var translate = [width / 2, height / 2];
  var precision = .1;

  var polygonClass = 'polygon-test';

  var proj = projectionFunc({
    projection: projection,
    scale: scale,
    translate: translate,
    precision: precision
  });
  var geo = geoPath(proj);


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
    </Chart>
    , document.getElementById('blank-polygon')
  )

})()

```

## Components

- Polygon
- Point
- PointText
- Centroid
- Circle
- ChartContainer
- Graticule
- Mesh
- Voronoi
- Sphere
- Svg
- Title
- Tile
- VectorTile
- Tooltip
- Arc
- Marker
- Popup
- zoomControl

## Export functions

- geoPath
- graticule
- projection
- scale
- isTooltipUpdate
- tileFunc


## Install

```
npm install react-d3-map-core
```

## Setting tile animation

for tiles we use `ReactCSSTransitionGroup` for css animation. You can clone the css below to your html to have your tiles with animations while leaving and entering.

Or you could simply clone the code in `react-d3-map.css`.

```css
.tiles-enter {
  opacity: 0.01;
}

.tiles-enter.tiles-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.tiles-leave {
  opacity: 1;
}

.tiles-leave.tiles-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
```

## License

Apache 2.0
