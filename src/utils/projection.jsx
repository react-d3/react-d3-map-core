"use strict";

import d3 from 'd3';

export function projection(props) {
  const {
    projection,
    pointRadius
  } = props;

  var projFunc = _getProj(projection);

  var simplifyArea;
  var bounds;

  var proj = _mkProjectionSettings(props, projFunc);

  if (!props.simplify)
    return proj;

  var area = props.simplifyArea || 1;
  var simplify = _simplify(area);
  var round = _round();
  var projStream = proj.stream;

  // clip path with bounds
  if (props.clip && props.bounds) {
     var bound = props.bounds;
     var clip = d3.geo.clipExtent()
     .extent(props.bounds);
 
    proj.stream = function(s) {
      return simplify.stream(projStream(round.stream(clip.stream(s))));
    };
  }
  else {
    proj.stream = function(s) {
      return simplify.stream(projStream(round.stream(s)));
    };
  }

  return proj;
}

function _getProj(projection) {
  /* albersUsa
   * azimuthalEquidistant
   * azimuthalEqualArea
   * conicEqulArea
   * conicConformal
   * conicEquidistant
   * equirectangularm
   * gnomonicm
   * orthographicm
   * stereographic
   * transverseMercator */

  if (d3.geo.hasOwnProperty(projection))
    return d3.geo[projection]();
  else if (projection === null)
    return null;
  else
    new Error(`Please check your projection setting. "${projection}" projection is invalid. `);
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

function _round(area) {
  return d3.geo.transform({
    point: function(x, y, z) {
      this.stream.point(Math.round(x), Math.round(y));
    },
    sphere: function() {
      this.stream.sphere();
    }
  });
}

function _simplify(area) {
  return d3.geo.transform({
    point: function(x, y, z) {
      if (!z) {
        this.stream.point(x, y);
      }
      else if (z >= area) {
        this.stream.point(x, y);
      }
    },
    sphere: function() {
      this.stream.sphere();
    }
  });
}
