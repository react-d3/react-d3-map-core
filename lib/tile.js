"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _utilsTooltipUpdate = require('./utils/tooltipUpdate');

var Tile = (function (_Component) {
  _inherits(Tile, _Component);

  function Tile(props) {
    _classCallCheck(this, Tile);

    _get(Object.getPrototypeOf(Tile.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Tile, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilsTooltipUpdate.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_mkTile',
    value: function _mkTile(dom) {
      var _props = this.props;
      var tiles = _props.tiles;
      var tileClass = _props.tileClass;
      var onMouseOut = _props.onMouseOut;
      var onMouseOver = _props.onMouseOver;

      var tileDom = d3.select(dom);

      tileDom.selectAll('image').data(tiles).enter().append('image').attr('class', tileClass + ' tile').attr("xlinkHref", function (d) {
        return "http://" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
      }).attr("width", Math.round(tiles.scale)).attr("height", Math.round(tiles.scale)).attr("x", function (d) {
        return Math.round((d[0] + tiles.translate[0]) * tiles.scale);
      }).attr("y", function (d) {
        return Math.round((d[1] + tiles.translate[1]) * tiles.scale);
      }).on("mouseover", function (d, i) {
        return onMouseOver(this, d, i);
      }).on("mouseout", function (d, i) {
        return onMouseOut(this, d, i);
      });

      return tileDom;
    }
  }, {
    key: 'render',
    value: function render() {
      var tile = _reactFauxDom2['default'].createElement('g');
      var chart = this._mkTile(tile);

      return chart.node().toReact();
    }
  }], [{
    key: 'defaultProps',
    value: {
      tileClass: 'react-d3-map-core__tile',
      onMouseOver: function onMouseOver(d) {},
      onMouseOut: function onMouseOut(d) {}
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      tiles: _react.PropTypes.array.isRequired,
      tileClass: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Tile;
})(_react.Component);

exports['default'] = Tile;
module.exports = exports['default'];