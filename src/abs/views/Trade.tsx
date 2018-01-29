import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TradeItem from './TradeItem';
import { ListView, PullToRefresh, Picker, WingBlank, SegmentedControl } from 'antd-mobile';
import { TradeApi } from '../config/api';
import Request from '../../common/http/request';
import '../components/abs-table/index.less';
import '../components/abs-picker/index.less';

/**
 * 组件state
 * 
 * @interface AppState
 */
interface AppState {
    dataSource: any; // ListView组件数据源
    isLoading: boolean;
    height: number;
    hasMore: boolean; // 是否有更多内容
    useBodyScroll: boolean; // 是否使用html的body作为滚动容器
    endInfo: string; // 结尾信息
    refreshing?: boolean;
    initialListSize: number; // 组件刚挂载的时候渲染数据行数

}

var lv: ListView | null;
// 数据查询条数
const NUM_ROWS = 15;
// 数据查询页数
let pageIndex = 1;
// table数据
var rData: Object[] = [];

// 评级集合
let ratingList: any[] = [];
// 利率集合
let couponList: any[] = [];
// 期限集合
let walbuckList: any[] = [];

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
    <div onClick={props.onClick}>
        <div style={{ display: 'table-cell', height: '30px', lineHeight: '30px' }}>
            <div style={{ fontSize: 15 }}>{props.extra}</div>
        </div>
    </div>
);

// 按钮切换事件
var onFakePickerClick = (e) => {
    alert(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
};

// 虚拟切换按钮组
const PickerFakeChildren = props => (
    <WingBlank size="lg" className="sc-example">
        <SegmentedControl values={['全部状态', '全部产品', '全部市场']} onChange={onFakePickerClick} />
    </WingBlank>
);

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
 * @extends {React.Component<{}, AppState>}
 */
export default class Trade extends React.Component<{}, AppState> {
    ratingValues: string[] = []; // 评级value集合
    couponValues: string[] = [];   // 利率value集合
    walbuckValues: string[] = []; // 期限value集合
    constructor(props: any) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
            initialListSize: NUM_ROWS,
            endInfo: ''
        };

        this.onPickerChange = this.onPickerChange.bind(this);
    }

    /**
     * picker选择器确认修改方法
     * 
     * @param {string} cmd 
     * @memberof Trade
     */
    onPickerChange(cmd: string, content: string[]) {
        if (cmd === 'ratingValues') {
            this.ratingValues = content;
        } else if (cmd === 'couponValues') {
            this.couponValues = content;
        } else {
            this.walbuckValues = content;
        }
        pageIndex = 1;
        this.onRefresh();
    }

    /**
     * 调用获取期限集合接口
     * 
     * @memberof Trade
     */
    getWalbuckList() {
        if (walbuckList.length > 0) {
            this.walbuckValues.push(walbuckList[0].value);
        } else {
            Request.post(TradeApi.walbuckList).then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        walbuckList.push({ label: element.Value, value: element.Key });
                    });
                    this.walbuckValues.push(walbuckList[0].value);
                }
            });
        }

    }

    /**
     * 调用获取利率集合接口
     * 
     * @memberof Trade
     */
    getCouponList() {
        if (couponList.length > 0) {
            this.couponValues.push(couponList[0].value);
        } else {
            Request.post(TradeApi.couponList).then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        couponList.push({ label: element.Value, value: element.Key });
                    });
                    this.couponValues.push(couponList[0].value);
                }
            });
        }
    }

    /**
     * 调用获取评级集合接口
     * 
     * @memberof Trade
     */
    getRatingList() {
        if (ratingList.length > 0) {
            this.ratingValues.push(ratingList[0].value);
        } else {
            Request.post(TradeApi.ratingList).then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        ratingList.push({ label: element.Value, value: element.Key });
                    });
                    this.ratingValues.push(ratingList[0].value);
                }
            });
        }
    }

    /**
     * 调用接口获取数据源
     * 
     * @param {number} page 页数
     * @param {number} direction 方向(1--向下;0--默认) 
     * @memberof Trade
     */
    genData(cmd: string, refresh: boolean = false, page: number = 0, direction: number = 0) {
        console.log(refresh);
        if (refresh) {
            pageIndex = 1;
            rData = [];
        }
        console.log(page);
        var ratingValue = (this.ratingValues[0] === undefined ? 0 : this.ratingValues[0]) as string;
        var couponValue = (this.couponValues[0] === undefined ? 0 : this.couponValues[0]) as string;
        var walbuckValue = (this.walbuckValues[0] === undefined ? 0 : this.walbuckValues[0]) as string;

        var url = TradeApi.list;
        url = url + '/' + ratingValue + '/' + couponValue + '/' + walbuckValue;
        url = url + '/' + direction + '/' + page * NUM_ROWS + '/' + NUM_ROWS;

        Request.post(url).then((res) => {
            if (res.length === 0) {
                if (cmd === 'onRefresh') {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows([]),
                        endInfo: '没有更多了',
                        hasMore: false
                    });
                } else {
                    this.setState({
                        endInfo: '没有更多了',
                        hasMore: false
                    });
                }

            } else {
                rData = [...rData, ...res];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(rData),
                    isLoading: false,
                    endInfo: '加载完成',
                });
            }
        });
    }

    /**
     * 在组件完成更新后立即调用。在初始化时不会被调用。
     * 
     * @memberof Trade
     */
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     *  如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等
     * 操作(防止异部操作阻塞UI)。
     * 
     * @memberof Trade
     */
    componentDidMount() {
        this.getWalbuckList();
        this.getCouponList();
        this.getRatingList();
        // ListView组件高度
        const hei = this.state.height - (ReactDOM.findDOMNode(lv as ListView) as any).offsetTop;
        setTimeout(() => {
            this.genData('', true, 1, 0);
            this.setState({
                height: hei,
                refreshing: false,
            });
        }, 0);
    }

    /**
     * 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold(默认1000)个像素
     * 的距离时调用
     * 
     * @memberof Trade
     */
    onEndReached = (event) => {
        console.log('end');
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true, endInfo: '正在加载...' });

        this.genData('', false, pageIndex++, 1);
    }

    /**
     * 刷新回调函数
     * 
     * @memberof Trade
     */
    onRefresh = (refresh: boolean = true) => {
        this.setState({ refreshing: true, isLoading: true });
        this.genData('onRefresh', refresh, 1);
        this.setState({
            refreshing: false
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
                <PickerFakeChildren />
                <table cellSpacing={0} cellPadding={0} >
                    <tbody>
                        <tr>
                            <td>
                                <Picker data={ratingList} title="选择评级" cols={1} value={this.ratingValues} onOk={v => this.onPickerChange('ratingValues', v)}>
                                    <CustomChildren />
                                </Picker>
                            </td>
                            <td>
                                <Picker data={couponList} title="选择利率" cols={1} value={this.couponValues} onOk={v => this.onPickerChange('couponValues', v)}>
                                    <CustomChildren />
                                </Picker>
                            </td>
                            <td>
                                <Picker data={walbuckList} title="选择期限" cols={1} value={this.walbuckValues} onOk={v => this.onPickerChange('walbuckValues', v)}>
                                    <CustomChildren />
                                </Picker>
                            </td>
                        </tr >
                    </tbody>
                </table >
                <table cellSpacing={0} cellPadding={0}>
                    <thead>
                        <tr>
                            <th />
                            <th>证券简称</th>
                            <th className="text-right">金额(亿)</th>
                            <th className="text-right">资产类别</th>
                        </tr>
                    </thead>
                </table>
                <ListView
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => lv = el}
                    dataSource={this.state.dataSource}
                    initialListSize={this.state.initialListSize}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.endInfo}
                    </div>)}
                    renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey} />}
                    renderRow={row}
                    useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? {} : {
                        height: this.state.height,
                    }}
                    pullToRefresh={<PullToRefresh
                        getScrollContainer={() => lv}
                        direction={'down'}
                        refreshing={this.state.refreshing}
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