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
  isTooltipUpdate
} from './utils/tooltipUpdate';

export default class Marker extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    markerClass: 'react-d3-map-core__marker'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    markerClass: PropTypes.string,
    onMouseOver: (d) => {},
    onMouseOut: (d) => {},
    onClick: (d) => {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkMarker(dom) {
    const {
      data,
      markerClass,
      x,
      y,
      onMouseOut,
      onMouseOver,
      onClick
    } = this.props;

    var marker = d3.select(dom);

    marker.append('image')
      .datum(data)
      .attr('class', `${markerClass} marker`)
      .attr("xlinkHref", "../img/marker-icon.png")
      .attr("x", x - (25 / 2))
      .attr("y", y - (41))
      .attr("height", 41)
      .attr("width", 25)

    marker.append('image')
      .datum(data)
      .attr('class', `${markerClass} marker-shadow`)
      .attr("xlinkHref", "../img/marker-shadow.png")
      .attr("x", x - (25 / 2))
      .attr("y", y - (41))
      .attr("height", 41)
      .attr("width", 41)

    if(onMouseOver)
      marker.on("mouseover", function (d, i) {return onMouseOver(this, data, x, y, i);})

    if(onMouseOver)
      marker.on("mouseout", function (d, i) {return onMouseOut(this, data, x, y, i);} )

    if(onClick)
      marker.on("click", function(d, i) { return onClick(this, data, x, y, i); })

    return marker;
  }

  render () {
    var markerGroup = ReactFauxDOM.createElement('g');
    var chart = this._mkMarker(markerGroup)

    return chart.node().toReact();
  }

}
