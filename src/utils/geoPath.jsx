"use strict";

export function geoPath(proj, props) {
  props = props || {}

  const {
    pointRadius
  } = props;

  var geoPath = d3.geo.path();

  geoPath.projection(proj);

  if(pointRadius)
    geoPath.pointRadius(pointRadius)

  return geoPath;

}
