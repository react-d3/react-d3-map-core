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
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
  }

  static defaultProps = {
    sphereClass: 'react-d3-map-core__sphere'
  }

  static propTypes = {
    geoPath: PropTypes.func.isRequired,
    sphereClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.xTooltip !== this.props.xTooltip ||
      nextProps.yTooltip !== this.props.yTooltip)
      return false;
    else
      return true;
  }

  _mkGraticule(dom) {
    const {
      sphereClass,
      geoPath,
      onMouseOut,
      onMouseOver
    } = this.props;

    var sphere = d3.select(dom)

    sphere
      .datum({type: "Sphere"})
      .attr('class', `${sphereClass} sphere`)
      .attr('d', geoPath)
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return sphere;
  }

  render () {
    var sphereGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkGraticule(sphereGroup);

    return chart.node().toReact();
  }

}
