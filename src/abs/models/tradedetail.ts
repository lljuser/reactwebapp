import tradeDetailService from '../services/tradedetail';

export default {
    namespace: 'tradedetail',
    state: {
        detailInfo: {}, // 交易详情
        loading: true,
        noteId: 0,
    },
    reducers: {
        /**
         * 获取详情数据
         * 
         * @param {*} state 
         * @param {*} action 
         * @returns 
         */
        getDetail(state: any, action: any) {
            return {
                detailInfo: action.data.tradeDetail.detailInfo,
                noteId: action.noteId
            };
        },
        /**
         * 显示loading动画
         */
        showLoading(state: any, action: any) {
            return {
            ...state,
            loading: action.loading
            };
        }
    },
    effects: {
        /**
         * 获取详情数据
         * 
         * @param {*} action 
         * @param {*} { call, put } 
         * @returns 
         */
        *getDetailData(action: any, { call, put }: any) {

            try {
                yield put({type: 'showLoading', loading: true});
                // don't use yield [] , or you may got some warning , use Promise.all[] instead in service...
                const tradeDetail = yield call(tradeDetailService.getTradeDetail,
                                            action.tradeId,
                                            action.noteId);
                yield put({
                    type: 'getDetail',
                    data: {
                        tradeDetail,
                    },
                    noteId: action.noteId
                });
                yield put({type: 'showLoading', loading: false});
            } catch (e) {
                // alert(e.message);
                return;
            }
        }
    }
};
