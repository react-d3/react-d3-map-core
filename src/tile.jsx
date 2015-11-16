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

export default class Tile extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    tileClass: 'react-d3-map-core__tile',
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
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
      .attr("xlinkHref", (d) => { return "http://" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .attr("width", Math.round(tiles.scale))
      .attr("height", Math.round(tiles.scale))
      .attr("x", (d) => { return Math.round((d[0] + tiles.translate[0]) * tiles.scale); })
      .attr("y", (d) => { return Math.round((d[1] + tiles.translate[1]) * tiles.scale); })
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return tileDom;
  }

  render () {
    var tile = ReactFauxDOM.createElement('g');
    var chart = this._mkTile(tile)

    return chart.node().toReact();
  }

}
