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

export default class Polygon extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    polygonClass: 'react-d3-map-core__polygon'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    polygonClass: PropTypes.string
  }

  _mkPolygon(dom) {
    const {
      data,
      polygonClass,
      geoPath
    } = this.props;

    var polygon = d3.select(dom);

    polygon
      .datum(data)
      .attr('class', `${polygonClass} polygon`)
      .attr("d", geoPath)

    return polygon;
  }

  render () {
    var poly = ReactFauxDOM.createElement('path');
    var chart = this._mkPolygon(poly)

    return chart.node().toReact();
  }

}
