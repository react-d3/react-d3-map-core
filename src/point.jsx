"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

import {
  projection
} from './utils/projection';

import {
  geoPath
} from './utils/geoPath';


export default class Point extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    pointClass: 'react-d3-map-core__point'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    pointClass: PropTypes.string
  }

  _mkPoint(dom) {
    const {
      data,
      pointClass
    } = this.props;

    var proj = projection(this.props);
    var geo = geoPath(this.props, proj);
    var point = d3.select(dom);

    point
      .datum(data)
      .attr('class', `${pointClass} point`)
      .attr("d", geo);

    return point;
  }

  render () {
    var pointGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkPoint(pointGroup)

    return chart.node().toReact();
  }

}
