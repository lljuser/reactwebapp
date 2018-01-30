import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView, PullToRefresh, Picker } from 'antd-mobile';
import TradeItem from './TradeItem';
import '../components/abs-table/index.less';
import '../components/abs-picker/index.less';
import { connect } from 'dva';

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
    <div onClick={props.onClick}>
        <div style={{ display: 'table-cell', lineHeight: '30px' }}>
            <div style={{ fontSize: 15 }}>{props.extra}</div>
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
        <div className="abs-table abs-table-product">
            <table cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr>
                        <th />
                        <th>证券简称</th>
                        <th className="text-right">金额(亿)</th>
                        <th className="text-right">资产类别</th>
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
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    /**
     * picker选择器确认修改方法
     * 
     * @param {string} picker 
     * @memberof Trade
     */
    onPickerChange(picker: string, val: string[]) {
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
     * 在组件完成更新后立即调用。在初始化时不会被调用。
     * 
     * @memberof Trade
     */
    componentDidUpdate() {
        // if (this.props.useBodyScroll) {
        //     document.body.style.overflow = 'auto';
        // } else {
        //     document.body.style.overflow = 'hidden';
        // }
    }

    /**
     * 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     *  如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等
     * 操作(防止异部操作阻塞UI)。
     * 
     * @memberof Trade
     */
    componentDidMount() {
        if (this.props.rData.length === 0) {
            // ListView组件高度
            const hei = this.props.height - (ReactDOM.findDOMNode(lv as ListView) as any).offsetTop;
            this.props.dispatch({
                type: 'trade/componentDidMount',
                height: hei,
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
        });
    }

    /**
     * 刷新回调函数
     * 
     * @memberof Trade
     */
    onRefresh() {
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
            <div className="abs-table abs-table-product">
                <table cellSpacing={0} cellPadding={0} >
                    <tbody>
                        <tr>
                            <td>
                                <Picker data={this.props.ratingList} title="选择评级" cols={1} value={this.props.ratingValues} onOk={v => this.onPickerChange('ratingValues', v)}>
                                    <CustomChildren />
                                </Picker>
                            </td>
                            <td>
                                <Picker data={this.props.couponList} title="选择利率" cols={1} value={this.props.couponValues} onOk={v => this.onPickerChange('couponValues', v)}>
                                    <CustomChildren />
                                </Picker>
                            </td>
                            <td>
                                <Picker data={this.props.walbuckList} title="选择期限" cols={1} value={this.props.walbuckValues} onOk={v => this.onPickerChange('walbuckValues', v)}>
                                    <CustomChildren />
                                </Picker>
                            </td>
                        </tr >
                    </tbody>
                </table >
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
                    style={this.props.useBodyScroll ? {} : {
                        height: this.props.height,
                    }}
                    pullToRefresh={<PullToRefresh
                        getScrollContainer={() => lv}
                        direction={'down'}
                        refreshing={this.props.refreshing}
                        onRefresh={this.onRefresh}
                        distanceToRefresh={25}
                        indicator={{
                            activate: <div>下拉刷新数据</div>
                        }}
                    />}
                    onEndReached={this.onEndReached}
                    pageSize={15}
                />
            </div >
        );
    }
}

function mapStateToProps(state: any) {
    return {
        ...state.trade,
    };
}
export default connect(mapStateToProps)(Trade);