"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

import d3 from 'd3';

import {
  isTooltipUpdate
} from './utils/tooltipUpdate';


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

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkPolygon(dom) {
    const {
      id,
      data,
      polygonClass,
      geoPath,
      onMouseOut,
      onMouseOver,
      onClick
    } = this.props;

    var polygon = d3.select(dom);

    polygon
      .datum(data)
      .attr('class', `${polygonClass} polygon`)
      .attr("d", geoPath)
      .style('fill', '#222');

    if(id)
      polygon.attr('id', id);

    if(onMouseOver)
      polygon.on("mouseover", function (d, i) {return onMouseOver(this, d, id);});

    if(onMouseOut)
      polygon.on("mouseout", function (d, i) {return onMouseOut(this, d, id);} );

    if(onClick)
      polygon.on("click", function (d, i) {return onClick(this, d, id);});

    return polygon;
  }

  render () {
    var poly = ReactFauxDOM.createElement('path');
    var chart = this._mkPolygon(poly);

    return chart.node().toReact();
  }

}
