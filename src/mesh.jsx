"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

export default class Mesh extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    meshClass: 'react-d3-map-core__mesh'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    meshClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.xTooltip !== this.props.xTooltip ||
      nextProps.yTooltip !== this.props.yTooltip)
      return false;
    else
      return true;
  }

  _mkMesh(dom) {
    const {
      data,
      meshClass,
      geoPath
    } = this.props;

    var mesh = d3.select(dom);

    mesh
      .datum(data)
      .attr('class', `${meshClass} mesh`)
      .attr("d", geoPath);

    return mesh;
  }

  render () {
    var meshGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkMesh(meshGroup)

    return chart.node().toReact();
  }

}
