"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.projection = projection;

function projection(props) {
  var projection = props.projection;
  var pointRadius = props.pointRadius;

  var projFunc;

  if (projection === 'albers') projFunc = d3.geo.albers();else if (projection === 'mercator') projFunc = d3.geo.mercator();else if (projection === 'albersUsa') projFunc = d3.geo.albersUsa();else if (projection === 'azimuthalEqualArea') projFunc = d3.geo.azimuthalEqualArea();else if (projection === 'azimuthalEquidistant') projFunc = d3.geo.azimuthalEquidistant();else if (projection === 'conicEqualArea') projFunc = d3.geo.conicEqualArea();else if (projection === 'conicConformal') projFunc = d3.geo.conicConformal();else if (projection === 'conicEquidistant') projFunc = d3.geo.conicEquidistant();else if (projection === 'equirectangular') projFunc = d3.geo.equirectangular();else if (projection === 'gnomonic') projFunc = d3.geo.gnomonic();else if (projection === 'orthographic') projFunc = d3.geo.orthographic();else if (projection === 'stereographic') projFunc = d3.geo.stereographic();else if (projection === 'transverseMercator') projFunc = d3.geo.transverseMercator();else if (projection === null) return null;else new Error('Please check your projection setting. "' + projection + '" projection is invalid. ');

  var proj = _mkProjectionSettings(props, projFunc);

  return proj;
}

function _mkProjectionSettings(props, func) {
  var scale = props.scale;
  var translate = props.translate;
  var precision = props.precision;
  var rotate = props.rotate;
  var center = props.center;
  var clipAngle = props.clipAngle;
  var parallels = props.parallels;

  if (scale) func.scale(scale);
  if (translate) func.translate(translate);
  if (precision) func.precision(precision);
  if (rotate) func.rotate(rotate);
  if (center) func.center(center);
  if (clipAngle) func.clipAngle(clipAngle);
  if (parallels) func.parallels(parallels);

  return func;
}