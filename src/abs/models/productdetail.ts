import productDetailService from '../services/productdetail';

export default {
  namespace: 'productdetail',
  state: {
    id: 0,
    detail: null,
    noteConsTable: null,
    chartWidthPx: 0,
    chart: null,
    loading: false
  },
  reducers: {
    /**
     * 返回详细信息
     */
    returnData(state: any, action: any) {

      if (state.loading) {
        return state;
      }
      return {
        ...state,
        detail: action.detail,
        noteConsTable: action.noteConsTable,
        chartWidthPx: action.chartWidthPx,
        chart: action.chart,
        id: action.id
      };
    }
  },
  effects: {
    /**
     * 获取详细信息
     */
    *getData(action: any, { call, put }: any) {
      try {
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
      } catch (e) {
        return;
      }
    }
  }
};
