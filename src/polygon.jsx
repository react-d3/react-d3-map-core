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

export default class Polygon extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    polygonClass: 'react-d3-map-core__polygon'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    polygonClass: PropTypes.string
  }

  _mkPolygon(dom) {
    const {
      data,
      polygonClass
    } = this.props;

    var proj = projection(this.props);

    var polygon = d3.select(dom)
      .attr('class', 'react-d3-map-core__polygon_group');

    polygon.append('path')
      .datum(data)
      .attr('class', `${polygonClass} polygon`)
      .attr("d", proj)

    return polygon;
  }

  render () {
    var poly = ReactFauxDOM.createElement('g');
    var chart = this._mkPolygon(poly)

    return chart.node().toReact();
  }

}
