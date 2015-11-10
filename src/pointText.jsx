
"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

export default class PointText extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    pointTextClass: 'react-d3-map-core__pointText',
    dy: '.35em',
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    projection: PropTypes.func.isRequired,
    pointTextClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.xTooltip !== this.props.xTooltip ||
      nextProps.yTooltip !== this.props.yTooltip)
      return false;
    else
      return true;
  }

  _mkPointText(dom) {
    const {
      data,
      pointTextClass,
      text,
      x,
      dy,
      textAnchor,
      projection,
      onMouseOut,
      onMouseOver
    } = this.props;

    var pointText = d3.select(dom);

    pointText
      .datum(data)
      .attr('class', `${pointTextClass} pointText`)
      .attr("transform", (d) => { return 'translate(' + projection(d.geometry.coordinates) + ')'})
      .attr("dy", dy)
      .attr("x", x)
      .style("text-anchor", textAnchor)
      .text(text)
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return pointText;
  }

  render () {
    var pointTextGroup = ReactFauxDOM.createElement('text');
    var chart = this._mkPointText(pointTextGroup)

    return chart.node().toReact();
  }

}
