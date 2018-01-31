// import { routerRedux } from 'dva/router'; 
// const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
import { ListView } from 'antd-mobile';
import tradeService from '../services/trade';

const listviewdata = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

export default {
    namespace: 'trade',
    state: {
        dataSource: listviewdata, // ListView组件数据源
        loading: true,
        height: document.documentElement.clientHeight,
        hasMore: true, // 是否有更多内容
        useBodyScroll: false, // 是否使用html的body作为滚动容器
        info: '', // 结尾信息
        refreshing: true,
        initialListSize: 15, // 组件刚挂载的时候渲染数据行数
        rows: 15, // 数据查询条数
        pageIndex: 0, // 数据查询页数
        rData: [], // table数据
        ratingValues: [], // 评级value集合
        ratingList: [], // 评级集合
        couponValues: [], // 利率value集合
        couponList: [], // 利率集合
        walbuckValues: [], // 期限value集合
        walbuckList: [], // 期限集合
        detailInfo: {}
    },
    reducers: {
        /**
         * Picker选择器选择项变更事件处理
         * 
         * @param {*} state 选择项变更传入state
         * @param {*} action 选择项变更动作
         * @returns 
         */
        returnChangePicker(state: any, action: any) {
            console.log(action);
            switch (action.picker) {
                case 'ratingValues': // 评级
                    return {
                        ...state,
                        ratingValues: action.val,
                    };
                case 'couponValues':
                    return {
                        ...state,
                        couponValues: action.val,
                    };
                case 'walbuckValues':
                    return {
                        ...state,
                        walbuckValues: action.val,
                    };
                default:
                    return { ...state };
            }
        },
        /**
         * 初始化Picker选择器参数
         * 
         * @param {*} state 
         * @param {*} action 
         * @returns 
         */
        formatPickerData(state: any, action: any) {
            switch (action.cmd) {
                case 'resRating': return {
                    ...state,
                    ratingValues: action.ratingValues,
                    ratingList: action.ratingList
                };
                case 'resWalbuck': return {
                    ...state,
                    walbuckValues: action.walbuckValues,
                    walbuckList: action.walbuckList
                };
                case 'resCoupon': return {
                    ...state,
                    couponValues: action.couponValues,
                    couponList: action.couponList
                };
                default:
                    return { ...state };
            }
        },
        /**
         * 获取详情数据
         * 
         * @param {*} state 
         * @param {*} action 
         * @returns 
         */
        getDetail(state: any, action: any) {
            return {
                detailInfo: action.data.tradeDetail[0].detailInfo
            };
        },
        /**
         * 修改数据源内容
         * 
         * @param {*} state 
         * @param {*} action 
         * @returns 
         */
        updateDataSource(state: any, action: any) {
            return {
                ...state, dataSource: listviewdata.cloneWithRows(action.rData), rData: action.rData, refreshing: false, info: action.info,
                hasMore: action.hasMore, pageIndex: action.pageIndex, loading: action.loading
            };
        },
        /**
         * 修改底部信息显示内容
         * 
         * @param {*} state 
         * @param {*} action 
         * @returns 
         */
        updateLoadingState(state: any, action: any) {
            return {
                ...state,
                info: action.info,
                loading: action.loading,
                refreshing: action.refreshing
            };
        }
    },
    effects: {
        /**
         * Picker选择器选择事件
         * 
         * @param {*} action 
         * @param {*} { call, put } 
         */
        *onPickerChange(action: any, { call, put }: any) {
            let ratingValue = action.ratingValues;
            let couponValue = action.couponValues;
            let walbuckValue = action.walbuckValues;

            if (action.picker === 'ratingValues') {
                ratingValue = action.val;
            }
            if (action.picker === 'couponValues') {
                couponValue = action.val;
            }
            if (action.picker === 'walbuckValues') {
                walbuckValue = action.val;
            }
            const resGenData = yield call([tradeService, tradeService.genData], true, 0, 1, [], action.rows,
                ratingValue[0], couponValue[0], walbuckValue[0]
            );

            yield put({ type: 'returnChangePicker', picker: action.picker, val: action.val });
            yield put({ type: 'updateDataSource', rData: resGenData.rData, info: resGenData.info, hasMore: resGenData.hasMore, pageIndex: 0, loading: false });
        },
        /**
         * 客户端组件第一次渲染
         * 
         * @param {*} action 
         * @param {*} { call, put } 
         */
        *componentDidMount(action: any, { call, put }: any) {
            yield put({ type: 'updateLoadingState', info: '正在加载...', loading: true, refreshing: false });
            const resWalbuck = yield call([tradeService, tradeService.getWalbuckList]);
            yield put({ type: 'formatPickerData', cmd: 'resWalbuck', walbuckValues: resWalbuck.walbuckValues, walbuckList: resWalbuck.walbuckList });

            const resCoupon = yield call([tradeService, tradeService.getCouponList]);
            yield put({ type: 'formatPickerData', cmd: 'resCoupon', couponValues: resCoupon.couponValues, couponList: resCoupon.couponList });

            const resRating = yield call([tradeService, tradeService.getRatingList]);
            yield put({ type: 'formatPickerData', cmd: 'resRating', ratingValues: resRating.ratingValues, ratingList: resRating.ratingList });

            // 第一次请求数据源
            const resGenData = yield call([tradeService, tradeService.genData], true, 0, 1, [], action.rows);
            yield put({ type: 'updateDataSource', rData: resGenData.rData, info: resGenData.info, hasMore: resGenData.hasMore, pageIndex: 0, loading: false });
        },
        /**
         * 刷新数据源
         * 
         * @param {*} action 
         * @param {*} { call, put } 
         */
        *onRefresh(action: any, { call, put }: any) {
            yield put({ type: 'updateLoadingState', info: '正在加载...', loading: true, refreshing: false });
            const resGenData = yield call([tradeService, tradeService.genData], true, 0, 1, [], action.rows,
                action.ratingValues[0], action.couponValues[0], action.walbuckValues[0]
            );
            yield put({ type: 'updateDataSource', rData: resGenData.rData, info: resGenData.info, hasMore: resGenData.hasMore, pageIndex: 0, loading: false });
        },
        /**
         * 下滑到底部加载数据
         * 
         * @param {*} action 
         * @param {*} { call, put } 
         */
        *onEndReached(action: any, { call, put }: any) {
            yield put({ type: 'updateLoadingState', info: '正在加载...', loading: true, refreshing: false });
            const resGenData = yield call([tradeService, tradeService.genData], false, 1, action.pageIndex, action.rData, action.rows,
                action.ratingValues[0], action.couponValues[0], action.walbuckValues[0]
            );
            yield put({ type: 'updateDataSource', rData: resGenData.rData, info: resGenData.info, hasMore: resGenData.hasMore, pageIndex: action.pageIndex, loading: false });
        },
    }
};
