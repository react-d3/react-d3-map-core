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
    dy: '.35em',
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    circleClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.xTooltip !== this.props.xTooltip ||
      nextProps.yTooltip !== this.props.yTooltip)
      return false;
    else
      return true;
  }

  _mkCircle(dom) {
    const {
      data,
      circleClass,
      geoPath,
      r,
      x,
      y,
      onMouseOut,
      onMouseOver
    } = this.props;

    var circle = d3.select(dom);

    circle
      .datum(data)
      .attr('class', `${circleClass} bubble`)
      .attr("transform", (d) => { return `translate(${x}, ${y})`})
      .attr("r", r)
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);})

    return circle;
  }

  render() {
    var circle = ReactFauxDOM.createElement('circle');
    var chart = this._mkCircle(circle)

    return chart.node().toReact();
  }
}
