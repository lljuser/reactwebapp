import service, { defaultChart } from '../services/market';

export default {
  namespace: 'market',
  state: {
    marketSummary: [],
    chart: defaultChart,
    loaded: false
  },
  reducers: {
    load(state: any, action: any) {
      const {marketSummary, chart, loaded} = action.data;
      if (state.loaded) {
        return state;
      }

      return {...state, marketSummary, chart, loaded};
    }
  },
  effects: {
    *fetch(action: any, { call, put }: any) {
      try {

        const [marketSummary, chart] = yield [
          call(service.getMarketSummary),
          call(service.getMarketChartData)
        ];

        yield put({
          type: 'load',
          data: {
            marketSummary, chart, loaded: true
          }
        });
      } catch (e) {
        alert(e.message);
        return;
      }
    }
  }
};