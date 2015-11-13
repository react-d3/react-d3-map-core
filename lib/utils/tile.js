"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tileFunc = tileFunc;
require('../lib/d3.geo.tile.min.js');

function tileFunc(props) {
  var scale = props.scale;
  var translate = props.translate;
  var size = props.size;
  var zoomDelta = props.zoomDelta;

  var tileFunc;

  tileFunc = d3.geo.tile();

  if (scale) tileFunc.scale(scale);
  if (translate) tileFunc.translate(translate);
  if (size) tileFunc.size(size);
  if (zoomDelta) tileFunc.zoomDelta(zoomDelta);

  return tileFunc();
}