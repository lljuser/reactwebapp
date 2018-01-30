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
        useBodyScroll: true, // 是否使用html的body作为滚动容器
        info: '', // 结尾信息
        refreshing: true,
        initialListSize: 15, // 组件刚挂载的时候渲染数据行数
        rows: 15, // 数据查询条数
        pageIndex: 1, // 数据查询页数
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
        getDetail(state: any, action: any) {
            // const tradeDetail = action.data;
            console.log(action.data.tradeDetail[0].detailInfo);
            // if (state.loading) {
            //   return state;
            // }

            return {
                detailInfo: action.data.tradeDetail[0].detailInfo
            };
        },
        updateDataSource(state: any, action: any) {
            switch (action.cmd) {
                case 'componentDidMount': return { ...state, dataSource: listviewdata.cloneWithRows(action.rData), rData: action.rData, refreshing: false };
                default: return { ...state };
            }
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
            yield put({ type: 'returnChangePicker', picker: action.picker, val: action.val });
        },
        /**
         * 客户端组件第一次渲染
         * 
         * @param {*} action 
         * @param {*} { call, put } 
         */
        *componentDidMount(action: any, { call, put }: any) {
            const resWalbuck = yield call([tradeService, tradeService.getWalbuckList]);
            yield put({ type: 'formatPickerData', cmd: 'resWalbuck', walbuckValues: resWalbuck.walbuckValues, walbuckList: resWalbuck.walbuckList });

            const resCoupon = yield call([tradeService, tradeService.getCouponList]);
            yield put({ type: 'formatPickerData', cmd: 'resCoupon', couponValues: resCoupon.couponValues, couponList: resCoupon.couponList });

            const resRating = yield call([tradeService, tradeService.getRatingList]);
            yield put({ type: 'formatPickerData', cmd: 'resRating', ratingValues: resRating.ratingValues, ratingList: resRating.ratingList });

            // 第一次请求数据源
            const resGenData = yield call([tradeService, tradeService.genData], true, 0, 1, [], action.rows);
            yield put({ type: 'updateDataSource', cmd: 'componentDidMount', rData: resGenData.rData });
        },
        *getDetailData(action: any, { call, put }: any) {
            try {
                const tradeDetail = yield [
                    call(tradeService.getTradeDetail,
                        action.tradeId,
                        action.noteId)
                ];

                yield put({
                    type: 'getDetail',
                    data: {
                        tradeDetail,
                    }
                });
            } catch (e) {
                alert(e.message);
                return;
            }
        }
    }
};
