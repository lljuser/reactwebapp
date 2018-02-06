import * as React from 'react';
import ReactDOM from 'react-dom';
import { ListView, Picker } from 'antd-mobile';
import PullToRefresh from '../../../common/components/rmc-pull-to-refresh';
import TradeItem from './TradeItem';
import '../components/index.less';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel';

// 如果不是使用 List.Item 作为 children
const PickerChildren = props => (
    <div onClick={props.onClick} className={props.first ? 'picker-trigger first' : 'picker-trigger'}>
        <div className="selector">{props.extra}
            <i className="iconfont arrow-down">&#xe692;</i>
        </div>
    </div>
);

var lv: ListView | null;

/**
 * 自定义组件
 * 
 * @param {*} props 
 * @returns 
 */
function MyBody(props: any) {
    return (
        <div className="abs-table">
            <table cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr>
                        <th style={{ width: '20px' }} />
                        <th className="text-left" >证券简称</th>
                        <th>金额(亿)</th>
                        <th>资产类别</th>
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div >
    );
}

/**
 * 默认返回Trade组件
 * 
 * @export
 * @class Trade
 * @extends {React.Component<any, {}>}
 */
class Trade extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
    }

    /**
     * picker选择器确认修改方法
     * 
     * @param {string} picker 
     * @memberof Trade
     */
    onPickerChange(picker: string, val: string[]) {
        (ReactDOM.findDOMNode(lv as ListView)).scrollTo(0, 0);
        this.props.dispatch({
            type: 'trade/onPickerChange',
            picker: picker,
            val: val,
            rows: this.props.rows,
            ratingValues: this.props.ratingValues,
            couponValues: this.props.couponValues,
            walbuckValues: this.props.walbuckValues
        });
    }

    /**
     * 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     *  如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等
     * 操作(防止异部操作阻塞UI)。
     * 
     * @memberof Trade
     */
    componentDidMount() {
        // (ReactDOM.findDOMNode(lv as ListView)).addEventListener('touchmove', (e) => {
        //     console.log(e.touches[0].pageY);
        // });
        (ReactDOM.findDOMNode(lv as ListView)).scrollTo(0, this.props.scrollTop);
        if (this.props.rData.length === 0) {
            this.props.dispatch({
                type: 'trade/componentDidMount',
                rows: this.props.rows
            });
        }
    }

    /**
     * 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold(默认1000)个像素
     * 的距离时调用
     * 
     * @memberof Trade
     */
    onEndReached = (event) => {
        if (this.props.loading && !this.props.hasMore) {
            return;
        }
        this.props.dispatch({
            type: 'trade/onEndReached',
            pageIndex: this.props.pageIndex + 1,
            rData: this.props.rData,
            ratingValues: this.props.ratingValues,
            couponValues: this.props.couponValues,
            walbuckValues: this.props.walbuckValues,
            rows: this.props.rows,
        });
    }

    onScroll = (e) => {
        this.props.dispatch({
            type: 'trade/onScroll',
            scrollTop: (ReactDOM.findDOMNode(lv as ListView)).scrollTop,
            initialListSize: this.props.rData.length
        });
    }

    /**
     * 刷新回调函数
     * 
     * @memberof Trade
     */
    onRefresh = (refresh: boolean = true) => {
        this.props.dispatch({
            type: 'trade/onRefresh',
            rows: this.props.rows,
            ratingValues: this.props.ratingValues,
            couponValues: this.props.couponValues,
            walbuckValues: this.props.walbuckValues,
        });
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <TradeItem TradeId={rowData.TradeId} SecurityId={rowData.SecurityId} TradeTypeId={rowData.TradeTypeId} SecurityName={rowData.SecurityName} TotalOffering={rowData.TotalOffering} AssetType={rowData.AssetType} />
            );
        };
        return (
            <ABSPanel className={'abs-pull-refresh-wrapper'}>
                <div className="abs-picker">
                    <Picker
                        data={this.props.ratingList}
                        title="选择评级"
                        cols={1}
                        value={this.props.ratingValues}
                        onOk={v => this.onPickerChange('ratingValues', v)}
                    >
                        <PickerChildren first={true} />
                    </Picker>
                    <Picker
                        data={this.props.couponList}
                        title="选择利率"
                        cols={1}
                        value={this.props.couponValues}
                        onOk={v => this.onPickerChange('couponValues', v)}
                    >
                        <PickerChildren />
                    </Picker>
                    <Picker
                        data={this.props.walbuckList}
                        title="选择期限"
                        cols={1}
                        value={this.props.walbuckValues}
                        onOk={v => this.onPickerChange('walbuckValues', v)}
                    >
                        <PickerChildren />
                    </Picker>
                </div>
                <div className="abs-scrollview-container">
                    <ListView
                        key={this.props.useBodyScroll ? '0' : '1'}
                        ref={el => lv = el}
                        dataSource={this.props.dataSource}
                        initialListSize={this.props.initialListSize}
                        renderFooter={() => (<div style={{ textAlign: 'center' }}>
                            {this.props.info}
                        </div>)}
                        renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey} />}
                        renderRow={row}
                        useBodyScroll={this.props.useBodyScroll}
                        pullToRefresh={
                            <PullToRefresh
                                getScrollContainer={() => lv}
                                refreshing={this.props.refreshing}
                                onRefresh={this.onRefresh}
                            />}
                        onEndReached={this.onEndReached}
                        onScroll={this.onScroll}
                        pageSize={15}
                    />
                </div>
            </ABSPanel>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        ...state.trade,
    };
}
export default connect(mapStateToProps)(Trade);