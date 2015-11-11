
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

export default class Centroid extends Component {
  constructor(props) {
    super (props);
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
    centroidClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkCentroid(dom) {
    const {
      data,
      centroidClass,
      text,
      dy,
      geoPath,
      onMouseOut,
      onMouseOver
    } = this.props;

    var centroid = d3.select(dom);

    centroid
      .datum(data)
      .attr('class', `${centroidClass} centroid`)
      .attr("transform", (d) => { return 'translate(' + geoPath.centroid(d) + ')'})
      .attr("dy", dy)
      .text(text)
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return centroid;
  }

  render () {
    var centroidGroup = ReactFauxDOM.createElement('text');
    var chart = this._mkCentroid(centroidGroup)

    return chart.node().toReact();
  }

}
