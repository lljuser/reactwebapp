import service from '../services/trade';
export default {
    namespace: 'trade',
    state: {
        detailInfo: {
            DealFullName: ''
        },
    },
    reducers: {
        load(state: any, action: any) {
            alert('load');
            // const tradeDetail = action.data;
            console.log(action.data.tradeDetail[0].detailInfo);
            // if (state.loading) {
            //   return state;
            // }

            return {
                ...state,
                detailInfo: action.data.tradeDetail[0].detailInfo
            };
        }
    },
    effects: {
        *getDetailData(action: any, { call, put }: any) {
            try {
                alert(111);
                const tradeDetail = yield [
                    call(service.getTradeDetail,
                        action.tradeId,
                        action.noteId)
                ];

                yield put({
                    type: 'load',
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