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
      onMouseOver
    } = this.props;

    var mesh = d3.select(dom);

    mesh
      .datum(data)
      .attr('class', `${meshClass} mesh`)
      .attr("d", geoPath)
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return mesh;
  }

  render () {
    var meshGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkMesh(meshGroup)

    return chart.node().toReact();
  }

}
