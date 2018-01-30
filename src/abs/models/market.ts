import service, { defaultChart } from '../services/market';

export default {
  namespace: 'market',
  state: {
    marketSummary: [],
    chart: defaultChart,
    loading: false
  },
  reducers: {
    load(state: any, action: any) {
      const {marketSummary, chart, loading} = action.data;
      if (state.loading) {
        return state;
      }

      return {...state, marketSummary, chart, loading};
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
            marketSummary, chart, loading: true
          }
        });
      } catch (e) {
        // alert(e.message);
        return;
      }
    }
  }
};