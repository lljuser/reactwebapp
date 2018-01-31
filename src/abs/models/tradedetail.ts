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
                detailInfo: action.data.tradeDetail.detailInfo
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

            try {
              
              // don't use yield [] , or you may got some warning , use Promise.all[] instead in service...
              const tradeDetail = yield call(tradeDetailService.getTradeDetail,
                                        action.tradeId,
                                        action.noteId);
              yield put({
                  type: 'getDetail',
                  data: {
                      tradeDetail,
                  }
              });

            } catch (e) {
                // alert(e.message);
                return;
            }
        }
    }
};
