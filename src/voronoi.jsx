"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  default as ReactFauxDOM
} from 'react-faux-dom';

export default class Voronoi extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    initVoronoi: d3.geom.voronoi,
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
  }

  _mkVoronoi (dom) {
    const {
      x,
      y,
      width,
      height,
      data,
      onMouseOut,
      onMouseOver
    } = this.props;

    var voronoiInit = d3.geom.voronoi()
      .x(x)
      .y(y)
      .clipExtent([
        [0, 0],
        [width, height]
      ])

    voronoiInit(data)
      .forEach((d) => { d.point.cell = d; });

    var voronoiChart = d3.select(dom);
    var voronoiPath = voronoiChart.selectAll('path')
      .data(data)
    .enter().append('path')
      .attr("d", (d) => {return d.cell.length ? "M" + d.cell.join("L") + "Z" : null; })
      .datum((d) => {return d; })
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .style('fill', 'none')
      .style('pointer-events', 'all');

    return voronoiChart;
  }

  render() {

    var voronoiPath = ReactFauxDOM.createElement('g');
    voronoiPath.setAttribute("class", "react-d3-core-map__voronoi_utils")

    var voronoi = this._mkVoronoi(voronoiPath);

    return voronoi.node().toReact();
  }

}
