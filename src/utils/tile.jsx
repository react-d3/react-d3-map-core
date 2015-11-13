"use strict";

require('../library/d3.geo.tile.min.js');

export function tileFunc (props) {
  const {
    scale,
    translate,
    size,
    zoomDelta
  } = props;

  var tileFunc;

  tileFunc = d3.geo.tile()

  if(scale) tileFunc.scale(scale);
  if(translate) tileFunc.translate(translate);
  if(size) tileFunc.size(size);
  if(zoomDelta) tileFunc.zoomDelta(zoomDelta);

  return tileFunc();
}
