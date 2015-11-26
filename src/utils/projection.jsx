"use strict";

import d3 from 'd3';

export function projection(props) {
  const {
    projection,
    pointRadius
  } = props;

  var projFunc;

  if(projection === 'albers')
    projFunc = d3.geo.albers();
  else if (projection === 'mercator')
    projFunc = d3.geo.mercator();
  else if (projection === 'albersUsa')
    projFunc = d3.geo.albersUsa();
  else if (projection === 'azimuthalEqualArea')
    projFunc = d3.geo.azimuthalEqualArea();
  else if (projection === 'azimuthalEquidistant')
    projFunc = d3.geo.azimuthalEquidistant();
  else if (projection === 'conicEqualArea')
    projFunc = d3.geo.conicEqualArea();
  else if (projection === 'conicConformal')
    projFunc = d3.geo.conicConformal();
  else if (projection === 'conicEquidistant')
    projFunc = d3.geo.conicEquidistant();
  else if (projection === 'equirectangular')
    projFunc = d3.geo.equirectangular();
  else if (projection === 'gnomonic')
    projFunc = d3.geo.gnomonic();
  else if (projection === 'orthographic')
    projFunc = d3.geo.orthographic();
  else if (projection === 'stereographic')
    projFunc = d3.geo.stereographic();
  else if (projection === 'transverseMercator')
    projFunc = d3.geo.transverseMercator();
  else if (projection === null)
    return null;
  else
    new Error(`Please check your projection setting. "${projection}" projection is invalid. `)


  var proj = _mkProjectionSettings(props, projFunc);

  // proj stream then transfrom stream
  var projStream = proj.stream;
  proj.stream = function(s) {
    return projStream(_transform().stream(s));
  }

  return proj;
}

function _transform() {
  return d3.geo.transform({
    point: function(x,y) {
      this.stream.point(Math.round(x), Math.round(y));
    },
    lineStart: function() {
      this.stream.lineStart();
    },
    lineEnd: function() {
      this.stream.lineEnd();
    },
    polygonStart: function() {
      this.stream.polygonStart();
    },
    polygonEnd: function() {
      this.stream.polygonEnd();
    },
    pointRadius: function() {
      this.stream.pointRadius();
    },
    sphere: function() {
      this.stream.sphere();
    }
  });
}

function _mkProjectionSettings(props, func) {
  const {
    scale,
    translate,
    precision,
    rotate,
    center,
    clipAngle,
    parallels
  } = props;

  if(scale) func.scale(scale);
  if(translate) func.translate(translate);
  if(precision) func.precision(precision);
  if(rotate) func.rotate(rotate);
  if(center) func.center(center);
  if(clipAngle) func.clipAngle(clipAngle);
  if(parallels) func.parallels(parallels);

  return func;

}
