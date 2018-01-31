import productDetailService from '../services/productdetail';

export default {
  namespace: 'productdetail',
  state: {
    detail: null,
    noteConsTable: null,
    chartWidthPx: 0,
    chart: null,
    loading: false
  },
  reducers: {
    returnDetail(state: any, action: any) {
      if (state.loading) {
        return state;
      }
      return { ...state, detail: action.detail };
    },
    returnData(state: any, action: any) {

      if (state.loading) {
        return state;
      }
      return {
        ...state,
        detail: action.detail,
        noteConsTable: action.noteConsTable,
        chartWidthPx: action.chartWidthPx,
        chart: action.chart
      };
    }
  },
  effects: {
    *getDetail(action: any, { call, put }: any) {
      try {
        const detail = yield call(productDetailService.getDetail, action.id);
        yield put({
          type: 'returnDetail',
          detail: detail
        });
      } catch (e) {
        // alert(e.message);
        return;
      }
    },
    *getData(action: any, { call, put }: any) {
      try {
        const detail = yield call(productDetailService.getDetail, action.id);
        let chartWidthPx = 280;
        let noteConsTable = null;
        let chart = null;
        
        if (detail.DealId != null && detail.DealId > 0) {
          // if (detail.NoteList != null && detail.NoteList.length > 0) {
          //   // if (detail.NoteList.length > 6) {
          //   //   chartWidthPx = 280;
          //   // } else if (detail.NoteList.length > 4) {
          //   //   chartWidthPx = 200;
          //   // } else {
          //   //   chartWidthPx = 150;
          //   // }
          // }
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
          chart: chart
        });
      } catch (e) {
        // alert(e.message);
        return;
      }
    }
  }
};
