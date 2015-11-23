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

import {
  isTooltipUpdate
} from './utils/tooltipUpdate';

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
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkGraticule(dom) {
    const {
      graticuleClass,
      geoPath,
      onMouseOut,
      onMouseOver
    } = this.props;

    var grati = d3.select(dom)

    grati
      .datum(graticule(this.props))
      .attr('class', `${graticuleClass} graticule`)
      .attr('d', geoPath)
      .style('fill', 'none')
      .style('stroke', '#777')
      .style('stroke-opacity', .5)
      .style('stroke-width', '.5px')

    if(onMouseOut)
      grati.on("mouseover", function (d, i) {return onMouseOver(this, d, i);})

    if(onMouseOver)
      grati.on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return grati;
  }

  render () {
    var graticuleGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkGraticule(graticuleGroup);

    return chart.node().toReact();
  }

}
