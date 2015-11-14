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

export default class Arc extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    arcClass: 'react-d3-map-core__arc',
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
  }

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    geoPath: PropTypes.func.isRequired,
    arcClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkArc(dom) {
    const {
      data,
      arcClass,
      geoPath,
      onMouseOut,
      onMouseOver
    } = this.props;

    var arc = d3.select(dom);

    // TODO: two points should transform to arc.


    arc
      .datum(data)
      .attr('class', `${arcClass} arc`)
      .attr("d", geoPath)
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return arc;
  }

  render () {
    var arcGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkArc(arcGroup)

    return chart.node().toReact();
  }

}
