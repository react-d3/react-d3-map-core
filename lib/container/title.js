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

var _commonProps = require('../commonProps');

var _commonProps2 = _interopRequireDefault(_commonProps);

var ChartTitle = (function (_Component) {
  _inherits(ChartTitle, _Component);

  function ChartTitle(props) {
    _classCallCheck(this, ChartTitle);

    _get(Object.getPrototypeOf(ChartTitle.prototype), 'constructor', this).call(this, props);
  }

  _createClass(ChartTitle, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var titleClassName = _props.titleClassName;
      var title = _props.title;
      var width = _props.width;

      var titleStyle = {
        width: width,
        textAlign: 'center',
        fontSize: '2em',
        paddingBottom: '1.3em'
      };

      return _react2['default'].createElement(
        'div',
        {
          style: titleStyle,
          className: titleClassName
        },
        title
      );
    }
  }], [{
    key: 'defaultProps',
    value: Object.assign(_commonProps2['default'], {
      titleClassName: 'react-d3-core__container_title'
    }),
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      width: _react.PropTypes.number.isRequired,
      title: _react.PropTypes.string,
      titleClassName: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return ChartTitle;
})(_react.Component);

exports['default'] = ChartTitle;
module.exports = exports['default'];