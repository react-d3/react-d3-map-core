"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import d3 from 'd3';

import {
  default as CommonProps,
} from '../commonProps';

import {
  default as ReactDOM
} from 'react-dom'

export default class ChartSvg extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = Object.assign(CommonProps, {
    svgClassName: 'react-d3-map-core__container_svg',
    id: `react-d3-map-core__container_svg__${Math.floor(Math.random() * 100000)}`,
    scaleExtent: [1 << 12, 1 << 28]
  })

  static propTypes = {
    id: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    svgClassName: PropTypes.string.isRequired
  }

  componentDidMount() {
    var {
      width,
      height,
      scaleExtent,
      projection,
      onZoom,
      onZoomStart,
      onZoomEnd,
      center
    } = this.props;


    // implement zoom if xscale and y scale is set!
    if(projection && onZoom) {
      var center = projection(center);

      var zoom = d3.behavior.zoom()
        .scale(projection.scale() * 2 * Math.PI)
        .translate([width - center[0], height - center[1]])

      if(scaleExtent)
        zoom.scaleExtent(scaleExtent);

      if(onZoom)
        zoom.on("zoom", () => { onZoom.call(this, zoom.scale(), zoom.translate()) });

      if(onZoomStart)
        zoom.on("zoomstart", () => { onZoomStart.call(this, zoom.scale(), zoom.translate()) });

      if(onZoomEnd)
        zoom.on("zoomend", () => { onZoomEnd.call(this, zoom.scale(), zoom.translate()) });

      d3.select(ReactDOM.findDOMNode(this.refs.svgContainer))
        .call(zoom);
    }
  }

  render() {
    const {
      height,
      width,
      svgClassName,
      id,
      children
    } = this.props;

    return (
      <svg
        height = {height}
        width = {width}
        className = {svgClassName}
        id = {id}
        ref = "svgContainer"
      >
        <g>
          {children}
        </g>
      </svg>
    )
  }
}
