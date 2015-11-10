"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

export default class Point extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    pointClass: 'react-d3-map-core__point'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    pointClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.xTooltip !== this.props.xTooltip ||
      nextProps.yTooltip !== this.props.yTooltip)
      return false;
    else
      return true;
  }

  _mkPoint(dom) {
    const {
      data,
      pointClass,
      geoPath
    } = this.props;

    var point = d3.select(dom);

    point
      .datum(data)
      .attr('class', `${pointClass} point`)
      .attr("d", geoPath);

    return point;
  }

  render () {
    var pointGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkPoint(pointGroup)

    return chart.node().toReact();
  }

}
