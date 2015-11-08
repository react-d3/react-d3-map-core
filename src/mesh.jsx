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

import {
  geoPath
} from './utils/geoPath';

export default class Mesh extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    meshClass: 'react-d3-map-core__mesh'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    meshClass: PropTypes.string
  }

  _mkMesh(dom) {
    const {
      data,
      meshClass
    } = this.props;

    var proj = projection(this.props);
    var geo = geoPath(this.props, proj);

    var mesh = d3.select(dom);

    mesh
      .datum(data)
      .attr('class', `${meshClass} mesh`)
      .attr("d", geo);

    return mesh;
  }

  render () {
    var meshGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkMesh(meshGroup)

    return chart.node().toReact();
  }

}
