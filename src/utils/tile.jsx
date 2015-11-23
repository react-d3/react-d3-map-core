"use strict";

import d3 from 'd3';

import {
  default as tile
} from '../library/d3.geo.tile.js';

export function tileFunc (props) {
  const {
    scale,
    translate,
    size,
    zoomDelta
  } = props;

  var tileFunc;

  tileFunc = tile()

  if(scale) tileFunc.scale(scale);
  if(translate) tileFunc.translate(translate);
  if(size) tileFunc.size(size);
  if(zoomDelta) tileFunc.zoomDelta(zoomDelta);

  return tileFunc();
}
