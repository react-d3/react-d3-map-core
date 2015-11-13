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

var _containerSvg = require('./container/svg');

var _containerSvg2 = _interopRequireDefault(_containerSvg);

var _containerTitle = require('./container/title');

var _containerTitle2 = _interopRequireDefault(_containerTitle);

var _commonProps = require('./commonProps');

var _commonProps2 = _interopRequireDefault(_commonProps);

var _utilsTooltipUpdate = require('./utils/tooltipUpdate');

var ChartContainer = (function (_Component) {
  _inherits(ChartContainer, _Component);

  function ChartContainer(props) {
    _classCallCheck(this, ChartContainer);

    _get(Object.getPrototypeOf(ChartContainer.prototype), 'constructor', this).call(this, props);
  }

  _createClass(ChartContainer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilsTooltipUpdate.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var title = _props.title;

      var chartTitle;

      var divStyle = {
        width: width
      };

      if (title) chartTitle = _react2['default'].createElement(_containerTitle2['default'], this.props);

      return _react2['default'].createElement(
        'div',
        { style: divStyle },
        chartTitle,
        _react2['default'].createElement(_containerSvg2['default'], this.props)
      );
    }
  }], [{
    key: 'defaultProps',
    value: _commonProps2['default'],
    enumerable: true
  }]);

  return ChartContainer;
})(_react.Component);

exports['default'] = ChartContainer;
module.exports = exports['default'];