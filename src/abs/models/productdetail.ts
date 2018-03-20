import productDetailService from '../services/productdetail';

export default {
  namespace: 'productdetail',
  state: {
    id: 0,
    detail: null,
    noteConsTable: null,
    chartWidthPx: 0,
    chart: null,
    loading: true
  },
  reducers: {
    /**
     * 返回详细信息
     */
    returnData(state: any, action: any) {
      return {
        ...state,
        detail: action.detail,
        noteConsTable: action.noteConsTable,
        chartWidthPx: action.chartWidthPx,
        chart: action.chart,
        id: action.id
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
     * 获取详细信息
     */
    *getData(action: any, { call, put , take}: any) {
      try {
        yield put({type: 'showLoading', loading: true});
        const detail = yield call(productDetailService.getDetail, action.id);
        let chartWidthPx = 280;
        let noteConsTable = null;
        let chart = null;
        
        if (detail.DealId != null && detail.DealId > 0) {
          try {
            noteConsTable = yield call(productDetailService.getNoteConsTable, action.id, chartWidthPx, 200);
          } catch (e) {
            noteConsTable = null;
          }
        }
        try {
          if (detail.DealId != null && detail.DealId > 0) {
            chart = yield call(productDetailService.getChart, detail.DealId);
          }
        } catch (e) {
          chart = null;
        }

        yield put({
          type: 'returnData',
          detail: detail,
          noteConsTable: noteConsTable,
          chartWidthPx: chartWidthPx,
          chart: chart,
          id: action.id
        });
        yield put({type: 'showLoading', loading: false});
      } catch (e) {
        return;
      }
    }
  }
};
