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

var Voronoi = (function (_Component) {
  _inherits(Voronoi, _Component);

  function Voronoi(props) {
    _classCallCheck(this, Voronoi);

    _get(Object.getPrototypeOf(Voronoi.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Voronoi, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilsTooltipUpdate.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_mkVoronoi',
    value: function _mkVoronoi(dom) {
      var _props = this.props;
      var x = _props.x;
      var y = _props.y;
      var width = _props.width;
      var height = _props.height;
      var data = _props.data;
      var onMouseOut = _props.onMouseOut;
      var onMouseOver = _props.onMouseOver;

      var voronoiInit = d3.geom.voronoi().x(x).y(y).clipExtent([[0, 0], [width, height]]);

      voronoiInit(data).forEach(function (d) {
        d.point.cell = d;
      });

      var voronoiChart = d3.select(dom);
      var voronoiPath = voronoiChart.selectAll('path').data(data).enter().append('path').attr("d", function (d) {
        return d.cell ? "M" + d.cell.join("L") + "Z" : null;
      }).datum(function (d) {
        return d;
      }).on("mouseover", function (d, i) {
        return onMouseOver(this, d, i);
      }).on("mouseout", function (d, i) {
        return onMouseOut(this, d, i);
      }).style('fill', 'none').style('pointer-events', 'all');

      return voronoiChart;
    }
  }, {
    key: 'render',
    value: function render() {
      var voronoiPath = _reactFauxDom2['default'].createElement('g');
      voronoiPath.setAttribute("class", "react-d3-core-map__voronoi_utils");

      var voronoi = this._mkVoronoi(voronoiPath);

      return voronoi.node().toReact();
    }
  }], [{
    key: 'defaultProps',
    value: {
      onMouseOver: function onMouseOver(d) {},
      onMouseOut: function onMouseOut(d) {}
    },
    enumerable: true
  }]);

  return Voronoi;
})(_react.Component);

exports['default'] = Voronoi;
module.exports = exports['default'];