// import { routerRedux } from 'dva/router'; 
// const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
import { ListView } from 'antd-mobile';
import productService from '../services/product';

const listviewdata = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });

export default {
    namespace: 'product',
      state: {
        dataSource: listviewdata,
        currentStatus: [],
        currentStatusValue: [],
        dealType: [],
        dealTypeValue: [],
        productType: [],
        productTypeValue: [],
        refreshing: true,
        loading: true,
        height: document.documentElement.clientHeight,
        useBodyScroll: false,
        hasMore: true,
        initialListSize: 15,
        info: '',
        rows: 15,
        pageIndex: 0,
        rData: []
        },
      reducers: {
    returnChangePicker(state: any, action: any) {
            
            switch ( action.picker ) {
                case 'CurrentStatusValue':
                    console.log(action.val);
                    return { 
                        ...state, 
                        currentStatusValue: action.val,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        info: action.info,
                        loading: action.loading
                    };
                case 'DealTypeValue':
                    console.log(action.val);
                    return { 
                        ...state, 
                        dealTypeValue: action.val,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        info: action.info,
                        loading: action.loading
                    };
                case 'ProductTypeValue':
                    return { 
                        ...state, 
                        productTypeValue: action.val,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        info: action.info,
                        loading: action.loading
                    };
                default:
                    return {...state}; 
            }
        },
        returnFirstLoad(state: any, action: any) {
            return {
                ...state,
                dataSource: action.dataSource, 
                rData: action.rData,
                currentStatus: action.currentStatus,
                dealType: action.dealType,
                productType: action.productType,
                height: action.height,
                currentStatusValue: action.currentStatusValue,
                dealTypeValue: action.dealTypeValue,
                productTypeValue: action.productTypeValue,
                hasMore: action.hasMore,
                refreshing: action.refreshing,
                info: action.info,
                loading: action.loading
            }; 
        },
        returnList(state: any, action: any) {
            return {
                ...state,
                dataSource: action.dataSource, 
                rData: action.rData,
                hasMore: action.hasMore,
                refreshing: action.refreshing,
                pageIndex: action.pageIndex,
                info: action.info,
                loading: action.loading
            }; 
        },
        changeListState(state: any, action: any) {
            return {
                ...state,
                info: action.info,
                loading: action.loading,
                refreshing: action.refreshing
            }; 
        }
      },
      effects: {
        *firstload(action: any, { call, put }: any) {
            yield put({type: 'changeListState', info: '正在加载...' , loading: true, refreshing: false});
            const res = yield call([productService, productService.getData],
                0,
                action.rows,
                [],
                0,
                0,
                0,
                true
            );

            yield put({ 
                type: 'returnFirstLoad', 
                dataSource: listviewdata.cloneWithRows(res.rData), 
                rData: res.rData,
                currentStatus: res.CurrentStatus,
                dealType: res.DealType,
                productType: res.ProductType,
                height: action.height,
                currentStatusValue: res.CurrentStatusValue,
                dealTypeValue: res.DealTypeValue,
                productTypeValue: res.ProductTypeValue,
                hasMore: res.hasMore,
                refreshing: false,
                info: res.info,
                loading: false
            });
        },
        *changePicker(action: any , { call, put }: any) {
            yield put({type: 'changeListState', info: '正在加载...' , loading: true, refreshing: false});

            let currentStatusValue = action.currentStatusValue[0] === undefined ? 0 : action.currentStatusValue[0];
            let dealTypeValue = action.dealTypeValue[0] === undefined ? 0 : action.dealTypeValue[0];
            let productTypeValue = action.productTypeValue[0] === undefined ? 0 : action.productTypeValue[0];
            if (action.picker === 'CurrentStatusValue') {
                currentStatusValue = action.val;
            }
            if (action.picker === 'DealTypeValue') {
                dealTypeValue = action.val;
            }
            if (action.picker === 'ProductTypeValue') {
                productTypeValue = action.val;
            }
            const res = yield call(productService.getData,
                0,
                action.rows,
                [],
                currentStatusValue,
                dealTypeValue,
                productTypeValue,
                false
            );

            yield put({ 
                type: 'returnChangePicker', 
                picker: action.picker, 
                val: action.val,
                dataSource: listviewdata.cloneWithRows(res.rData),
                rData: res.rData,
                hasMore: res.hasMore,
                pageIndex: 0,
                refreshing: false,
                info: res.info,
                loading: false
            });
        },
        *getList(action: any , { call, put }: any) {

            yield put({type: 'changeListState', info: '正在加载...' , loading: true, refreshing: false});
            const res = yield call([productService, productService.getData],
                action.pageIndex,
                action.rows,
                action.rData,
                action.currentStatusValue,
                action.dealTypeValue,
                action.productTypeValue,
            );

            yield put({ 
                type: 'returnList', 
                dataSource: listviewdata.cloneWithRows(res.rData),
                rData: res.rData,
                hasMore: res.hasMore,
                pageIndex: action.pageIndex,
                refreshing: false,
                info: res.info,
                loading: false
            });
        },
        *RefreshListView( action: any , { call, put }: any) {

            const res = yield call([productService, productService.getData],
                0,
                action.rows,
                [],
                action.currentStatusValue,
                action.dealTypeValue,
                action.productTypeValue,
            );
            yield put({ 
                type: 'returnList', 
                dataSource: listviewdata.cloneWithRows(res.rData),
                rData: res.rData,
                hasMore: res.hasMore,
                pageIndex: 0,
                refreshing: false,
                info: res.info,
                loading: false
            });
        },
      }
  }; 
  