import service from '../services/market';

export default {
  namespace: 'market',
  state: {
    marketSummary: []
  },
  reducers: {
    load(state: any, action: any) {
      const marketSummary = action.data;
      if (marketSummary && marketSummary.length > 0) {
        return { ...state, marketSummary };
      }
      return state;
    }
  },
  effects: {
    *fetch(action: any, { call, put }: any) {
      try {
        const data = yield call(service.getMarketSummary);
        yield put({
          type: 'load',
          data: data
        });
      } catch (e) {
        alert(e.message);
        return;
      }
    }
  }
};