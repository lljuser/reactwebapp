import service, { defaultChart } from '../services/market';

export default {
  namespace: 'market',
  state: {
    marketSummary: [],
    chart: defaultChart,
    loading: false,
    firstloading: true          // 控制第一次加载时显示遮蔽
  },
  reducers: {
    load(state: any, action: any) {
      const { marketSummary, chart, loading } = action.data;
      if (state.loading) {
        return state;
      }

      return { ...state, marketSummary, chart, loading };
    },
    /**
     * 显示loading动画
     */
    showLoading(state: any, action: any) {
      return {
        ...state,
        firstloading: action.firstloading
      };
    }
  },
  effects: {
    *fetch(action: any, { call, put }: any) {
      try {
        yield put({type: 'showLoading', firstloading: true});

        const [marketSummary, chart] = yield call([service, service.getMarketData]);
        yield put({
          type: 'load',
          data: {
            marketSummary, chart, loading: true
          }
        });
        
        yield put({type: 'showLoading', firstloading: false});
      } catch (e) {
        // alert(e.message);
        return;
      }
    },
  }
};