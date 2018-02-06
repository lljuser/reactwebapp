import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Spinner from 'react-spinkit';
import Loader  from 'react-loader-spinner';

var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    } if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    } return t;
};
import React from 'react';
import classNames from 'classnames';

var StaticRenderer = function (_React$Component) {
    _inherits(StaticRenderer, _React$Component);

    function StaticRenderer() {
        _classCallCheck(this, StaticRenderer);

        return _possibleConstructorReturn(this, (StaticRenderer.__proto__ || Object.getPrototypeOf(StaticRenderer)).apply(this, arguments));
    }

    _createClass(StaticRenderer, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.shouldUpdate;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.render()
            );
        }
    }]);

    return StaticRenderer;
}(React.Component);

function setTransform(nodeStyle, value) {
    nodeStyle.transform = value;
    nodeStyle.webkitTransform = value;
    nodeStyle.MozTransform = value;
}

var isWebView = typeof navigator !== 'undefined' && /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
var DOWN = 'down';
var UP = 'up';

//此处修改下拉内容<Loader type="Audio" color="#FFC446" height={40} width={40}/>
var activateSpinner = React.createElement(Loader, { type: 'ThreeDots', color:'gray', height:30, width:30 })
var activateHtml = React.createElement('div', { style: { width: '40px', margin: '0px auto' } }, activateSpinner)

var deactivateSpinner = React.createElement(Loader, { type: 'Ball-Triangle', color:'gray', height:27, width:27 })
var deactivateHtml = React.createElement('div', { style: { width: '40px', margin: '0px auto' } }, deactivateSpinner)

var releaseSpinner = React.createElement(Loader, { type: 'ThreeDots', color:'gray', height:40, width:40 })
var releaseHtml = React.createElement('div', { style: { width: '40px', margin: '0px auto' } }, releaseSpinner)

var finishSpinner = React.createElement(Loader, { type: 'ThreeDots', color:'gray', height:25, width:25 })
var finishHtml = React.createElement('div', { style: { width: '40px', margin: '0px auto' } },finishSpinner)
var INDICATOR = {
    activate: activateHtml, deactivate: deactivateHtml, release: releaseHtml, finish: finishHtml
};

var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
            supportsPassive = true;
        }
    });
    window.addEventListener('test', null, opts);
} catch (e) {
    // empty
}
var willPreventDefault = supportsPassive ? { passive: false } : false;
// const willNotPreventDefault = supportsPassive ? { passive: true } : false;

var PullToRefresh = function (_React$Component2) {
    _inherits(PullToRefresh, _React$Component2);

    function PullToRefresh() {
        _classCallCheck(this, PullToRefresh);

        // https://github.com/yiminghe/zscroller/blob/2d97973287135745818a0537712235a39a6a62a1/src/Scroller.js#L355
        // currSt: `activate` / `deactivate` / `release` / `finish`
        var _this2 = _possibleConstructorReturn(this, (PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).apply(this, arguments));

        _this2.state = {
            currSt: '',
            dragOnEdge: false
        };
        _this2.shouldUpdateChildren = false;
        _this2.triggerPullToRefresh = function () {
            // 在初始化时、用代码 自动 触发 pullToRefresh
            // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
            if (!_this2.state.dragOnEdge) {
                if (_this2.props.refreshing) {
                    if (_this2.props.direction === UP) {
                        _this2._lastScreenY = -_this2.props.distanceToRefresh - 1;
                    }
                    if (_this2.props.direction === DOWN) {
                        _this2._lastScreenY = _this2.props.distanceToRefresh + 1;
                    }
                    // change dom need after setState
                    _this2.setState({ currSt: 'release' }, function () {
                        return _this2.setContentStyle(_this2._lastScreenY);
                    });
                } else {
                    _this2.setState({ currSt: 'finish' }, function () {
                        return _this2.reset();
                    });
                }
            }
        };
        _this2.init = function (ele) {
            if (!ele) {
                // like return in destroy fn ???!!
                return;
            }
            _this2._to = {
                touchstart: _this2.onTouchStart.bind(_this2, ele),
                touchmove: _this2.onTouchMove.bind(_this2, ele),
                touchend: _this2.onTouchEnd.bind(_this2, ele),
                touchcancel: _this2.onTouchEnd.bind(_this2, ele)
            };
            Object.keys(_this2._to).forEach(function (key) {
                ele.addEventListener(key, _this2._to[key], willPreventDefault);
            });
        };
        _this2.destroy = function (ele) {
            if (!_this2._to || !ele) {
                // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
                return;
            }
            Object.keys(_this2._to).forEach(function (key) {
                ele.removeEventListener(key, _this2._to[key]);
            });
        };
        _this2.onTouchStart = function (_ele, e) {
            _this2._ScreenY = _this2._startScreenY = e.touches[0].screenY;
            // 一开始 refreshing 为 true 时 this._lastScreenY 有值
            _this2._lastScreenY = _this2._lastScreenY || 0;
        };
        _this2.isEdge = function (ele, direction) {
            var container = _this2.props.getScrollContainer();
            if (container && container === document.body) {
                // In chrome61 `document.body.scrollTop` is invalid
                var scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
                if (direction === UP) {
                    return scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight;
                }
                if (direction === DOWN) {
                    return scrollNode.scrollTop <= 0;
                }
            }
            if (direction === UP) {
                return ele.scrollHeight - ele.scrollTop === ele.clientHeight;
            }
            if (direction === DOWN) {
                return ele.scrollTop <= 0;
            }
        };
        _this2.onTouchMove = function (ele, e) {
            // 使用 pageY 对比有问题
            var _screenY = e.touches[0].screenY;
            var direction = _this2.props.direction;
            var maxscreeny = _this2.props.maxscreeny;
            // 拖动方向不符合的不处理

            if (direction === UP && _this2._startScreenY < _screenY || direction === DOWN && _this2._startScreenY > _screenY) {
                return;
            }
            if (_this2.isEdge(ele, direction)) {
                if (!_this2.state.dragOnEdge) {
                    _this2.setState({ dragOnEdge: true });
                }
                e.preventDefault();
                // add stopPropagation with fastclick will trigger content onClick event. why?
                // ref https://github.com/ant-design/ant-design-mobile/issues/2141
                // e.stopPropagation();
                var _diff = Math.round(_screenY - _this2._ScreenY);

                if (_diff > 0) {
                    if (_this2._lastScreenY > (maxscreeny / 2)) {
                        _diff = 1 / (_this2._lastScreenY / maxscreeny);
                    }
                }

                _this2._ScreenY = _screenY;
                _this2._lastScreenY += _diff;
                _this2.setContentStyle(_this2._lastScreenY);
                if (Math.abs(_this2._lastScreenY) < _this2.props.distanceToRefresh) {
                    if (_this2.state.currSt !== 'deactivate') {
                        // console.log('back to the distance');
                        _this2.setState({ currSt: 'deactivate' });
                    }
                } else {
                    if (_this2.state.currSt === 'deactivate') {
                        // console.log('reach to the distance');
                        _this2.setState({ currSt: 'activate' });
                    }
                }
                // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
                // iOS UIWebView issue, It seems no problem in WKWebView
                if (isWebView && e.changedTouches[0].clientY < 0) {
                    _this2.onTouchEnd();
                }
            }
        };
        _this2.onTouchEnd = function () {
            if (_this2.state.dragOnEdge) {
                _this2.setState({ dragOnEdge: false });
            }
            if (_this2.state.currSt === 'activate') {
                _this2.setState({ currSt: 'release' });
                _this2._timer = setTimeout(function () {
                    if (!_this2.props.refreshing) {
                        _this2.setState({ currSt: 'finish' }, function () {
                            return _this2.reset();
                        });
                    }
                    _this2._timer = undefined;
                }, 1000);
                setTransform(_this2.contentRef.style, 'translate3d(0px,' + _this2.props.springbackheight + 'px,0)');
                _this2.props.onRefresh();
            } else {
                _this2.reset();
            }
        };
        _this2.reset = function () {
            _this2._lastScreenY = 0;
            _this2.setContentStyle(0);
        };
        _this2.setContentStyle = function (ty) {
            // todos: Why sometimes do not have `this.contentRef` ?
            if (_this2.contentRef) {
                setTransform(_this2.contentRef.style, 'translate3d(0px,' + ty + 'px,0)');
            }
        };
        return _this2;
    }

    _createClass(PullToRefresh, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            this.shouldUpdateChildren = this.props.children !== nextProps.children;
            return true;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps === this.props || prevProps.refreshing === this.props.refreshing) {
                return;
            }
            // triggerPullToRefresh 需要尽可能减少 setState 次数
            this.triggerPullToRefresh();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout
            setTimeout(function () {
                _this3.init(_this3.props.getScrollContainer() || _this3.containerRef);
                _this3.triggerPullToRefresh();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // Should have no setTimeout here!
            this.destroy(this.props.getScrollContainer() || this.containerRef);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _a = this.props,
                className = _a.className,
                prefixCls = _a.prefixCls,
                children = _a.children,
                getScrollContainer = _a.getScrollContainer,
                direction = _a.direction,
                onRefresh = _a.onRefresh,
                refreshing = _a.refreshing,
                indicator = _a.indicator,
                maxscreeny = _a.maxscreeny,
                springbackheight = _a.springbackheight,
                distanceToRefresh = _a.distanceToRefresh,
                restProps = __rest(_a, ["className", "prefixCls", "children", "getScrollContainer", "direction", "onRefresh", "refreshing", "indicator","maxscreeny","springbackheight", "distanceToRefresh"]);
            var renderChildren = React.createElement(StaticRenderer, {
                shouldUpdate: this.shouldUpdateChildren, render: function render() {
                    return children;
                }
            });
            var renderRefresh = function renderRefresh(cls) {
                var cla = classNames(cls, !_this4.state.dragOnEdge && prefixCls + '-transition');
                return React.createElement(
                    'div',
                    { className: prefixCls + '-content-wrapper' },
                    React.createElement(
                        'div',
                        {
                            className: cla, ref: function ref(el) {
                                return _this4.contentRef = el;
                            }
                        },
                        direction === UP ? renderChildren : null,
                        React.createElement(
                            'div',
                            { className: prefixCls + '-indicator' },
                            indicator[_this4.state.currSt] || INDICATOR[_this4.state.currSt]
                        ),
                        direction === DOWN ? renderChildren : null
                    )
                );
            };
            if (getScrollContainer()) {
                return renderRefresh(prefixCls + '-content ' + prefixCls + '-' + direction);
            }
            return React.createElement(
                'div',
                _extends({
                    ref: function ref(el) {
                        return _this4.containerRef = el;
                    }, className: classNames(className, prefixCls, prefixCls + '-' + direction)
                }, restProps),
                renderRefresh(prefixCls + '-content')
            );
        }
    }]);

    return PullToRefresh;
}(React.Component);

export default PullToRefresh;

PullToRefresh.defaultProps = {
    prefixCls: 'am-pull-to-refresh',
    getScrollContainer: function getScrollContainer() {
        return undefined;
    },
    direction: DOWN,
    distanceToRefresh: 50,
    indicator: INDICATOR,
    maxscreeny: 50,//下拉阻力
    springbackheight: 30,//回弹距顶部高度
};