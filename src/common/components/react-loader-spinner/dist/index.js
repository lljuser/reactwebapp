(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './loading/audio', './loading/ball-triangle', './loading/bars', './loading/circles', './loading/grid', './loading/hearts', './loading/oval', './loading/puff', './loading/rings', './loading/tail-spin', './loading/three-dots'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./loading/audio'), require('./loading/ball-triangle'), require('./loading/bars'), require('./loading/circles'), require('./loading/grid'), require('./loading/hearts'), require('./loading/oval'), require('./loading/puff'), require('./loading/rings'), require('./loading/tail-spin'), require('./loading/three-dots'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.audio, global.ballTriangle, global.bars, global.circles, global.grid, global.hearts, global.oval, global.puff, global.rings, global.tailSpin, global.threeDots);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _audio, _ballTriangle, _bars, _circles, _grid, _hearts, _oval, _puff, _rings, _tailSpin, _threeDots) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Loader);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Loader.__proto__ || Object.getPrototypeOf(Loader)).call.apply(_ref, [this].concat(args))), _this), _this.svg = function (type, visible) {
        if (type === "Audio") {
          return (0, _audio.audio)(_this.props);
        } else if (type === "Ball-Triangle") {
          return (0, _ballTriangle.ballTrangle)(_this.props);
        } else if (type === "Bars") {
          return (0, _bars.bars)(_this.props);
        } else if (type === "Circles") {
          return (0, _circles.circles)(_this.props);
        } else if (type === "Grid") {
          return (0, _grid.grid)(_this.props);
        } else if (type === "Hearts") {
          return (0, _hearts.hearts)(_this.props);
        } else if (type === "Oval") {
          return (0, _oval.oval)(_this.props);
        } else if (type === "Puff") {
          return (0, _puff.puff)(_this.props);
        } else if (type === "Rings") {
          return (0, _rings.rings)(_this.props);
        } else if (type === "TailSpin") {
          return (0, _tailSpin.tailSpin)(_this.props);
        } else if (type === "ThreeDots") {
          return (0, _threeDots.threeDots)(_this.props);
        } else {
          return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              null,
              'Loading...Please Wait'
            ),
            _react2.default.createElement(
              'small',
              null,
              _react2.default.createElement(
                'i',
                null,
                'Note:No specfic svg type exist'
              )
            )
          );
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Loader, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            color = _props.color,
            type = _props.type,
            height = _props.height,
            width = _props.width;

        var style = {
          fill: color,
          height: height,
          width: width
        };
        return _react2.default.createElement(
          'div',
          null,
          this.svg(type)
        );
      }
    }]);

    return Loader;
  }(_react2.default.Component);

  Loader.propTypes = {
    color: _propTypes2.default.string,
    type: _propTypes2.default.string,
    height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  };
  Loader.defaultProps = {
    color: 'blue',
    type: 'audio',
    height: 80,
    width: 80,
    visible: true
  };
  exports.default = Loader;
});