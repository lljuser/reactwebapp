import tradeDetailService from '../services/tradedetail';

export default {
    namespace: 'tradedetail',
    state: {
        detailInfo: {} // 交易详情
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
                detailInfo: action.data.tradeDetail[0].detailInfo
            };
        },
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
            console.log(action);
            try {
                const tradeDetail = yield [
                    call(tradeDetailService.getTradeDetail,
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
