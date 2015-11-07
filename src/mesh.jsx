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

  _mkMesh(dom) {
    const {
      dataMesh,
      polygonClass
    } = this.props;

    var proj = projection(this.props);

    var mesh = d3.select(dom)
      .attr('class', 'mesh');

    mesh.append('path')
      .datum(dataMesh)
      .attr("d", proj);

    return mesh;
  }

  render () {
    var meshGroup = ReactFauxDOM.createElement('g');
    var chart = this._mkMesh(meshGroup)

    return chart.node().toReact();
  }

}
