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
  graticule
} from './utils/graticule';

export default class Graticule extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    graticuleClass: 'react-d3-map-core__graticule'
  }

  static propTypes = {
    geoPath: PropTypes.func.isRequired,
    graticuleClass: PropTypes.string
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
      graticuleClass,
      geoPath
    } = this.props;

    var grati = d3.select(dom)

    grati
      .datum(graticule(this.props))
      .attr('class', `${graticuleClass} graticule`)
      .attr('d', geoPath)

    return grati;
  }

  render () {
    var graticuleGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkGraticule(graticuleGroup);

    return chart.node().toReact();
  }

}
