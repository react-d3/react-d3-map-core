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
  projection
} from './utils/projection';

export default class Mesh extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    meshClass: 'react-d3-map-core__mesh'
  }

  static propTypes = {
    dataMesh: PropTypes.object.isRequired,
    meshClass: PropTypes.string
  }

  _mkMesh(dom) {
    const {
      data,
      meshClass
    } = this.props;

    var proj = projection(this.props);

    var mesh = d3.select(dom)
      .attr('class', 'react-d3-map-core__mesh_group');

    mesh.append('path')
      .datum(data)
      .attr('class', `${meshClass} mesh`)
      .attr("d", proj);

    return mesh;
  }

  render () {
    var meshGroup = ReactFauxDOM.createElement('g');
    var chart = this._mkMesh(meshGroup)

    return chart.node().toReact();
  }

}
