(function (global, factory) {
     if (typeof define === "function" && define.amd) {
          define(["exports", "react"], factory);
     } else if (typeof exports !== "undefined") {
          factory(exports, require("react"));
     } else {
          var mod = {
               exports: {}
          };
          factory(mod.exports, global.react);
          global.rings = mod.exports;
     }
})(this, function (exports, _react) {
     "use strict";

     Object.defineProperty(exports, "__esModule", {
          value: true
     });
     exports.rings = rings;

     var _react2 = _interopRequireDefault(_react);

     function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
               default: obj
          };
     }

     function rings(svg) {
          return _react2.default.createElement(
               "svg",
               { width: svg.width, height: svg.height, viewBox: "0 0 45 45", xmlns: "http://www.w3.org/2000/svg", stroke: svg.color },
               _react2.default.createElement(
                    "g",
                    { fill: "none", fillRule: "evenodd", transform: "translate(1 1)", strokeWidth: "2" },
                    _react2.default.createElement(
                         "circle",
                         { cx: "22", cy: "22", r: "6", strokeOpacity: "0" },
                         _react2.default.createElement("animate", { attributeName: "r",
                              begin: "1.5s", dur: "3s",
                              values: "6;22",
                              calcMode: "linear",
                              repeatCount: "indefinite" }),
                         _react2.default.createElement("animate", { attributeName: "stroke-opacity",
                              begin: "1.5s", dur: "3s",
                              values: "1;0", calcMode: "linear",
                              repeatCount: "indefinite" }),
                         _react2.default.createElement("animate", { attributeName: "stroke-width",
                              begin: "1.5s", dur: "3s",
                              values: "2;0", calcMode: "linear",
                              repeatCount: "indefinite" })
                    ),
                    _react2.default.createElement(
                         "circle",
                         { cx: "22", cy: "22", r: "6", strokeOpacity: "0" },
                         _react2.default.createElement("animate", { attributeName: "r",
                              begin: "3s", dur: "3s",
                              values: "6;22",
                              calcMode: "linear",
                              repeatCount: "indefinite" }),
                         _react2.default.createElement("animate", { attributeName: "strokeOpacity",
                              begin: "3s", dur: "3s",
                              values: "1;0", calcMode: "linear",
                              repeatCount: "indefinite" }),
                         _react2.default.createElement("animate", { attributeName: "strokeWidth",
                              begin: "3s", dur: "3s",
                              values: "2;0", calcMode: "linear",
                              repeatCount: "indefinite" })
                    ),
                    _react2.default.createElement(
                         "circle",
                         { cx: "22", cy: "22", r: "8" },
                         _react2.default.createElement("animate", { attributeName: "r",
                              begin: "0s", dur: "1.5s",
                              values: "6;1;2;3;4;5;6",
                              calcMode: "linear",
                              repeatCount: "indefinite" })
                    )
               )
          );
     }
});