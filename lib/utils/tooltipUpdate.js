"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTooltipUpdate = isTooltipUpdate;

function isTooltipUpdate(nextProps, nextState, that) {
  if (nextProps.xTooltip !== that.props.xTooltip || nextProps.yTooltip !== that.props.yTooltip) return true;else return false;
}