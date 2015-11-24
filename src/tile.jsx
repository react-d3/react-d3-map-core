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
    tileClass: PropTypes.string,
    scale: PropTypes.number.isRequired,
    translate: PropTypes.array.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  render () {
    const {
      scale,
      translate,
      tiles,
      tileClass,
      onLoad
    } = this.props;

    var transform = "scale(" + scale + ")translate(" + translate + ")";
    var tilesGroup = tiles.map((t, i) => {

      var id = 'react-d3-map-core__tiles__' + t.join('-');

      var c = t.slice();

      var minCol = 0;
      var maxCol = Math.pow(2, t[2]);

      while(c[0] < minCol) c[0] += maxCol;
      while(c[0] >= maxCol) c[0] -= maxCol;

      var z = c[2];
      var y = c[1];
      var x = c[0];
      var xlink;

      if((y >= maxCol || (c[2] === 0 && y > 0))
        || y < minCol){
        xlink = null;
      }else {
        xlink = "http://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png";
      }

      return (
        <image
          className= {tileClass + ' tile'}
          key= {t.join('-')}
          id= {id}
          xlinkHref= {xlink}
          width= {1}
          height= {1}
          x= {t[0]}
          y= {t[1]}
          onLoad= {onLoad}
        ></image>
      )
    })


    return (
      <g
        transform={transform}
      >
        <ReactCSSTransitionGroup component='g' transitionName="tiles" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
          {tilesGroup}
        </ReactCSSTransitionGroup>
      </g>
    );
  }

}
