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

var Polygon = (function (_Component) {
  _inherits(Polygon, _Component);

  function Polygon(props) {
    _classCallCheck(this, Polygon);

    _get(Object.getPrototypeOf(Polygon.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Polygon, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilsTooltipUpdate.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_mkPolygon',
    value: function _mkPolygon(dom) {
      var _props = this.props;
      var data = _props.data;
      var polygonClass = _props.polygonClass;
      var geoPath = _props.geoPath;
      var onMouseOut = _props.onMouseOut;
      var onMouseOver = _props.onMouseOver;

      var polygon = d3.select(dom);

      polygon.datum(data).attr('class', polygonClass + ' polygon').attr("d", geoPath).on("mouseover", function (d, i) {
        return onMouseOver(this, d, i);
      }).on("mouseout", function (d, i) {
        return onMouseOut(this, d, i);
      });

      return polygon;
    }
  }, {
    key: 'render',
    value: function render() {
      var poly = _reactFauxDom2['default'].createElement('path');
      var chart = this._mkPolygon(poly);

      return chart.node().toReact();
    }
  }], [{
    key: 'defaultProps',
    value: {
      polygonClass: 'react-d3-map-core__polygon',
      onMouseOver: function onMouseOver(d) {},
      onMouseOut: function onMouseOut(d) {}
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      data: _react.PropTypes.object.isRequired,
      geoPath: _react.PropTypes.func.isRequired,
      polygonClass: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Polygon;
})(_react.Component);

exports['default'] = Polygon;
module.exports = exports['default'];