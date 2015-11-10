"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

export default class Circle extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    centroidClass: 'react-d3-map-core__centroid',
    dy: '.35em'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    circleClass: PropTypes.string
  }

  _mkCircle(dom) {
    const {
      data,
      circleClass,
      geoPath,
      r,
      x,
      y
    } = this.props;

    var circle = d3.select(dom);

    circle
      .datum(data)
      .attr('class', `${circleClass} bubble`)
      .attr("transform", (d) => { return `translate(${x}, ${y})`})
      .attr("r", r)

    return circle;
  }

  render() {
    var circle = ReactFauxDOM.createElement('circle');
    var chart = this._mkCircle(circle)

    return chart.node().toReact();
  }
}
