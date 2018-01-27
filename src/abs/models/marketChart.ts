import service, { defaultChart } from '../services/market';

export default {
  namespace: 'marketChart',
  state: {
    chart: defaultChart,
    // 指示是否已加载过图表数据
    loaded: false
  },
  reducers: {
    load(state: any, action: any) {
      const {data: chart, loaded} = action;
      if (chart) {
        return { ...state, chart, loaded };
      }

      return state;
    }
  },
  effects: {
    *fetch(action: any, { call, put }: any) {
      try {
        const data = yield call(service.getMarketChartData);
        yield put({
          type: 'load',
          data: data,
          loaded: true
        });
      } catch (e) {
        alert(e.message);
        return;
      }
    }
  }
};