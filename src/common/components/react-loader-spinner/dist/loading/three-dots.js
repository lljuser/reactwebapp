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
                  global.threeDots = mod.exports;
         }
})(this, function (exports, _react) {
         "use strict";

         Object.defineProperty(exports, "__esModule", {
                  value: true
         });
         exports.threeDots = threeDots;

         var _react2 = _interopRequireDefault(_react);

         function _interopRequireDefault(obj) {
                  return obj && obj.__esModule ? obj : {
                           default: obj
                  };
         }

         function threeDots(svg) {
                  return _react2.default.createElement(
                           "svg",
                           { width: svg.width, height: svg.height, viewBox: "0 0 120 30", xmlns: "http://www.w3.org/2000/svg", fill: svg.color },
                           _react2.default.createElement(
                            "circle",
                            { cx: "15", cy: "15", r: "7", "fillOpacity": "0.6" },
                            _react2.default.createElement("animate", { attributeName: "r", from: "9", to: "9",
                                     begin: "0s", dur: "0.8s",
                                     values: "7;10;7", calcMode: "linear",
                                     repeatCount: "indefinite" }),
                            _react2.default.createElement("animate", { attributeName: "fillOpacity", from: "0.5", to: "0.5",
                                     begin: "0s", dur: "0.8s",
                                     values: ".5;1;.5", calcMode: "linear",
                                     repeatCount: "indefinite" })
                            ),
                           _react2.default.createElement(
                                    "circle",
                                    { cx: "60", cy: "15", r: "13","fillOpacity": "0.8" },
                                    _react2.default.createElement("animate", { attributeName: "r", from: "15", to: "15",
                                             begin: "0s", dur: "0.8s",
                                             values: "13;10;13", calcMode: "linear",
                                             repeatCount: "indefinite" }),
                                    _react2.default.createElement("animate", { attributeName: "fillOpacity", from: "1", to: "1",
                                             begin: "0s", dur: "0.8s",
                                             values: "1;.5;1", calcMode: "linear",
                                             repeatCount: "indefinite" })
                           ),  
                           _react2.default.createElement(
                                    "circle",
                                    { cx: "105", cy: "15", r: "16" },
                                    _react2.default.createElement("animate", { attributeName: "r", from: "15", to: "15",
                                             begin: "0s", dur: "0.8s",
                                             values: "16;10;16", calcMode: "linear",
                                             repeatCount: "indefinite" }),
                                    _react2.default.createElement("animate", { attributeName: "fillOpacity", from: "1", to: "1",
                                             begin: "0s", dur: "0.8s",
                                             values: "1;.5;1", calcMode: "linear",
                                             repeatCount: "indefinite" })
                           )
                  );
         }
});