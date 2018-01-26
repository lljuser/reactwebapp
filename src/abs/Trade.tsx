import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TradeItem from './TradeItem';
import { ListView, PullToRefresh } from 'antd-mobile';
import { TradeApi } from '../config/api';
import Request from '../components/http/request/index';
import '../public/css/theme.css';

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

/**
 * 自定义组件
 * 
 * @param {*} props 
 * @returns 
 */
function MyBody(props: any) {
    return (
        <div className={props.sectionID}>
            <div className={'appH5_body'}>
                <div className={'appH5_panel'}>
                    <table className={'appH5_table'} cellSpacing={0} cellPadding={0}>
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
                </div>
            </div>
        </div >
    );
}

/**
 * 
 * 
 * @export
 * @class Trade
 * @extends {React.Component<{}, AppState>}
 */
export default class Trade extends React.Component<{}, AppState> {
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
            endInfo: '',
        };
    }

    /**
     * 调用接口获取数据源
     * 
     * @param {number} page 页数
     * @param {number} direction 方向(1--向下) 
     * @memberof Trade
     */
    genData(page: number = 0, direction: number = 0) {
        var url = TradeApi.list;
        url = url + '/' + 0 + '/' + 0 + '/' + 0;
        url = url + '/' + direction + '/' + page * NUM_ROWS + '/' + NUM_ROWS;
        console.log(url);
        Request.post(url, {}, (res) => {
            if (res.length === 0) {
                this.setState({ endInfo: '没有更多了', hasMore: false });
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
        console.log('componentDidMount');
        console.log((ReactDOM.findDOMNode(lv as ListView) as any).offsetTop);
        // ListView组件高度
        const hei = this.state.height - (ReactDOM.findDOMNode(lv as ListView) as any).offsetTop;
        setTimeout(() => {
            this.genData(1, 0);
            this.setState({
                height: hei,
                isLoading: false,
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
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        console.log('onEndReached');
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }

        console.log('reach end', event);
        this.setState({ isLoading: true, endInfo: '正在加载...' });

        this.genData(pageIndex++, 1);
    }

    /**
     * 刷新回调函数
     * 
     * @memberof Trade
     */
    onRefresh = () => {
        console.log('onRefresh');
        this.setState({ refreshing: true, isLoading: true });
        this.genData(1);
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
        );
    }
}