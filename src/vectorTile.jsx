"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactDOM
} from 'react-dom'

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

import {
  default as Queue
} from 'queue-async';

import {
  isTooltipUpdate
} from './utils/tooltipUpdate';

import {
  default as ReactCSSTransitionGroup
} from 'react-addons-css-transition-group';

export default class VectorTile extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    vectorTileClass: 'react-d3-map-core__vectorTile',
    layers: 'all'
  }

  static propTypes = {
    vectorTiles: PropTypes.array.isRequired,
    vectorTileClass: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  componentDidMount() {
    var tilesGroup = ReactDOM.findDOMNode(this.refs.vectorTilesGroup)
    this._mkVectorTile(tilesGroup);
  }

  // componentDidUpdate() {
  //   var tilesGroup = ReactDOM.findDOMNode(this.refs.vectorTilesGroup)
  //   this._mkVectorTile(tilesGroup);
  // }

  _mkVectorTile(dom) {
    const {
      vectorTiles,
      vectorTileClass,
      onMouseOut,
      onMouseOver,
      layers,
      geoPath
    } = this.props;

    var vectorTileDom = d3.select(dom);

    Queue()
      .defer(d3.json, "http://vector.mapzen.com/osm/" + layers + "/" + vectorTiles[2] + "/" + vectorTiles[0] + "/" + vectorTiles[1] + ".json?api_key=vector-tiles-_dA3ANY")
      .await((error, json) => {
        if(json.features) {
          var path = vectorTileDom.selectAll("path")
              .data(json.features)
            .enter().append("path")
              .attr("key", (d, i) => {return i;})
              .attr("class", (d) => { return d.properties.kind; })
              .attr("d", geoPath);

          if(onMouseOut)
            path.on("mouseover", (d, i) => {return onMouseOver(this, d, i);})

          if(onMouseOver)
            path.on("mouseout", (d, i) => {return onMouseOut(this, d, i);} )
        }else {
          for(var key in json) {
            var path = vectorTileDom.selectAll("path")
                .data(json[key].features)
              .enter().append("path")
                .attr("key", (d, i) => {return i;})
                .attr("class", (d) => { return d.properties.kind; })
                .attr("d", geoPath);

            if(onMouseOut)
              path.on("mouseover", (d, i) => {return onMouseOver(this, d, i);})

            if(onMouseOver)
              path.on("mouseout", (d, i) => {return onMouseOut(this, d, i);} )
          }
        }
      });
  }

  render () {
    return (
      <g
        ref = "vectorTilesGroup"
        className = "tile"
      >
      </g>
    );
  }

}
