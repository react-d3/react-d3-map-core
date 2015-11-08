
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

export default class PointText extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    pointTextClass: 'react-d3-map-core__pointText',
    dy: '.35em'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    pointTextClass: PropTypes.string
  }

  _mkPointText(dom) {
    const {
      data,
      pointTextClass,
      text,
      x,
      dy,
      textAnchor
    } = this.props;

    var proj = projection(this.props);
    var pointText = d3.select(dom);

    pointText
      .datum(data)
      .attr('class', `${pointTextClass} pointText`)
      .attr("transform", (d) => { return 'translate(' + proj(d.geometry.coordinates) + ')'})
      .attr("dy", dy)
      .attr("x", x)
      .style("text-anchor", textAnchor)
      .text(text)

    return pointText;
  }

  render () {
    var pointTextGroup = ReactFauxDOM.createElement('text');
    var chart = this._mkPointText(pointTextGroup)

    return chart.node().toReact();
  }

}
