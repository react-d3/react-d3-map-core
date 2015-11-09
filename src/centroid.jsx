
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

export default class Centroid extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    centroidClass: 'react-d3-map-core__centroid',
    dy: '.35em'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    centroidClass: PropTypes.string
  }

  _mkCentroid(dom) {
    const {
      data,
      centroidClass,
      text,
      dy,
      geoPath
    } = this.props;

    var centroid = d3.select(dom);

    centroid
      .datum(data)
      .attr('class', `${centroidClass} centroid`)
      .attr("transform", (d) => { return 'translate(' + geoPath.centroid(d) + ')'})
      .attr("dy", dy)
      .text(text)

    return centroid;
  }

  render () {
    var centroidGroup = ReactFauxDOM.createElement('text');
    var chart = this._mkCentroid(centroidGroup)

    return chart.node().toReact();
  }

}
