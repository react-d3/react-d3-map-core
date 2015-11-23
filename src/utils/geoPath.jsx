"use strict";

import d3 from 'd3';

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
