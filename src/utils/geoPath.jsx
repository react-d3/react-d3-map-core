"use strict";

export function geoPath(props, proj) {
  const {
    pointRadius
  } = props;

  var geoPath = d3.geo.path();

  geoPath.projection(proj);

  if(pointRadius)
    geoPath.pointRadius(pointRadius)

  return geoPath;

}
