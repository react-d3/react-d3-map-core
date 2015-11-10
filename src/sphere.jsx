"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

export default class Sphere extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    sphereClass: 'react-d3-map-core__sphere'
  }

  static propTypes = {
    geoPath: PropTypes.func.isRequired,
    sphereClass: PropTypes.string
  }

  _mkGraticule(dom) {
    const {
      sphereClass,
      geoPath
    } = this.props;

    var sphere = d3.select(dom)

    sphere
      .datum({type: "Sphere"})
      .attr('class', `${sphereClass} sphere`)
      .attr('d', geoPath)

    return sphere;
  }

  render () {
    var sphereGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkGraticule(sphereGroup);

    return chart.node().toReact();
  }

}
