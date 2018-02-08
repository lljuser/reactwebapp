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
        global.grid = mod.exports;
    }
})(this, function (exports, _react) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.grid = grid;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function grid(svg) {
        return _react2.default.createElement(
            "svg",
            { width: svg.width, height: svg.height, viewBox: "0 0 105 105", xmlns: "http://www.w3.org/2000/svg", fill: svg.color },
            _react2.default.createElement(
                "circle",
                { cx: "12.5", cy: "12.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "0s", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "12.5", cy: "52.5", r: "12.5", "fillOpacity": ".5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "100ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "52.5", cy: "12.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "300ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "52.5", cy: "52.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "600ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "92.5", cy: "12.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "800ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "92.5", cy: "52.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "400ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "12.5", cy: "92.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "700ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "52.5", cy: "92.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "500ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            ),
            _react2.default.createElement(
                "circle",
                { cx: "92.5", cy: "92.5", r: "12.5" },
                _react2.default.createElement("animate", { attributeName: "fillOpacity",
                    begin: "200ms", dur: "1s",
                    values: "1;.2;1", calcMode: "linear",
                    repeatCount: "indefinite" })
            )
        );
    }
});