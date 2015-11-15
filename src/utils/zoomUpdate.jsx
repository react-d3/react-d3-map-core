"use strict";

export function isZoomUpdate(nextProps, nextState, that) {
  if(nextProps.zoomScale !== that.props.zoomScale ||
    nextProps.zoomTranslate !== that.props.zoomTranslate)
    return true;
  else
    return false;
}
