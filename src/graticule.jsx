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

import {
  geoPath
} from './utils/geoPath';

export default class Graticule extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    graticuleClass: 'react-d3-map-core__graticule'
  }

  static propTypes = {
    graticuleClass: PropTypes.string
  }

  _mkGraticule(dom) {
    const {
      graticuleClass
    } = this.props;

    var proj = projection(this.props);
    var geo = geoPath(this.props, proj);
    var grati = d3.select(dom)

    grati
      .datum(graticule(this.props))
      .attr('class', `${graticuleClass} graticule`)
      .attr('d', geo)

    return grati;
  }

  render () {
    var graticuleGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkGraticule(graticuleGroup);

    return chart.node().toReact();
  }

}
