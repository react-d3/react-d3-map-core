"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import d3 from 'd3';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

import {
  isTooltipUpdate
} from './utils/tooltipUpdate';

export default class Mesh extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    meshClass: 'react-d3-map-core__mesh',
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    meshClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkMesh(dom) {
    const {
      data,
      meshClass,
      geoPath,
      onMouseOut,
      onMouseOver,
      onClick,
      id
    } = this.props;

    var mesh = d3.select(dom);

    mesh
      .datum(data)
      .attr('class', `${meshClass} mesh`)
      .attr("d", geoPath)
      .style('fill', 'none')
      .style('stroke', '#CCC')
      .style('stroke-width', '.5px')

    if(id)
      mesh.attr('id', id);

    if(onMouseOver)
      mesh.on("mouseover", function (d, i) {return onMouseOver(this, d, id);})

    if(onMouseOut)
      mesh.on("mouseout", function (d, i) {return onMouseOut(this, d, id);} )

    if(onClick)
      mesh.on("click", function (d, i) {return onClick(this, d, id);})

    return mesh;
  }

  render () {
    var meshGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkMesh(meshGroup)

    return chart.node().toReact();
  }

}
