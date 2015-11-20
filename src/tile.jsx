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

import {
  default as ReactCSSTransitionGroup
} from 'react-addons-css-transition-group';

export default class Tile extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    tileClass: 'react-d3-map-core__tile'
  }

  static propTypes = {
    tiles: PropTypes.array.isRequired,
    tileClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkTile(dom) {
    const {
      tiles,
      tileClass,
      onMouseOut,
      onMouseOver
    } = this.props;

    var tileDom = d3.select(dom);

    var image = tileDom.selectAll('image')
      .data(tiles, function(d) { return d; });

    image.exit()
      .remove();

    image.enter().append('image')
      .attr('class', `${tileClass} tile`)
      .attr('key', (d, i) => { return i; })
      .attr("xlinkHref", (d) => { return "http://" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", (d) => { return d[0];})
      .attr("y", (d) => { return d[1];})

    if(onMouseOut)
      image.on("mouseover", function (d, i) {return onMouseOver(this, d, i);})

    if(onMouseOver)
      image.on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return tileDom;
  }

  render () {
    const {
      scale,
      translate
    } = this.props;

    var tile = ReactFauxDOM.createElement('g');
    var chart = this._mkTile(tile)

    var chartComponent = chart.node().children.map((d) => {return d.toReact();});
    var transform = "scale(" + scale + ")translate(" + translate + ")";

    return (
      <g
        transform={transform}
      >
        <ReactCSSTransitionGroup component='g' transitionName="tiles" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {chartComponent}
        </ReactCSSTransitionGroup>
      </g>
    );
  }

}
