// import { routerRedux } from 'dva/router'; 
// const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
import productDetailService, { defaultChart } from '../services/productdetail';

export default {
    namespace: 'productdetail',
    state: {
        detail: null,
        noteConsTable: null,
        chartWidthPx: 0,
        chart: defaultChart,
        loading: false
    },
    reducers: {
        returnDetail(state: any, action: any) {
            if (state.loading) {
                return state;
              }
            return {...state, detail: action.detail};
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
                let chartWidthPx = 0;
                let noteConsTable = null;
                let chart = defaultChart;

                if (detail.DealId != null && detail.DealId > 0) {
                    if ( detail.NoteList != null && detail.NoteList.length > 0) {
                        if ( detail.NoteList.length > 6)  {
                            chartWidthPx = 280;
                        } else if ( detail.NoteList.length > 4 ) {
                            chartWidthPx = 200;
                        } else {
                            chartWidthPx = 150;
                        }
                    }

                    noteConsTable = yield call(productDetailService.getNoteConsTable, action.id, chartWidthPx, 200);
                }

                if (detail.ResultSetId != null && detail.ResultSetId > 0) {
                    chart = yield call(productDetailService.getChart, detail.DealId, detail.ResultSetId);
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
  