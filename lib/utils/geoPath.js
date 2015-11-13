"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoPath = geoPath;

function geoPath(proj, props) {
  props = props || {};

  var _props = props;
  var pointRadius = _props.pointRadius;

  var geoPath = d3.geo.path();

  geoPath.projection(proj);

  if (pointRadius) geoPath.pointRadius(pointRadius);

  return geoPath;
}