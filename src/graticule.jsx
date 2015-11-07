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
  projection
} from './utils/projection';

export default class Graticule extends Component {
  constructor(props) {
    super (props);
  }

  _mkGraticule(dom) {
    const {
      graticuleClass
    } = this.props;

    var proj = projection(this.props);

    var grati = d3.select(dom);

    grati.append('path')
      .datum(graticule(this.props))
      .attr('class', `${graticuleClass} graticule`)
      .attr('d', proj)

    return grati;
  }

  render () {
    var graticuleGroup = ReactFauxDOM.createElement('g');
    var chart = this._mkGraticule(graticuleGroup);

    return chart.node().toReact();
  }

}
