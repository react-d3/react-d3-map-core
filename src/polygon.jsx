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

  _mkPolygon(dom) {
    const {
      dataFeatures,
      polygonClass
    } = this.props;

    var proj = projection(this.props);

    var polygon = d3.select(dom)
      .attr('class', 'polygon');

    if(!Array.isArray(dataFeatures))
      var data = [dataFeatures]
    else
      var data = dataFeatures

    polygon.selectAll('path')
      .data(data)
    .enter().append('path')
      .attr("d", proj)

    return polygon;
  }

  render () {
    var poly = ReactFauxDOM.createElement('g');
    var chart = this._mkPolygon(poly)

    return chart.node().toReact();
  }

}
