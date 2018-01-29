// import { routerRedux } from 'dva/router'; 
// const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
import { ListView } from 'antd-mobile';
import productService from '../abs/services/productService';

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
        isLoading: true,
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
            console.log('returnChangePicker');
            console.log(state);
            switch ( action.picker ) {
                case 'CurrentStatusValue':
                    console.log(action.val);
                    return { ...state, CurrentStatusValue: action.val };
                case 'DealTypeValue':
                    console.log(action.val);
                    return { ...state, DealTypeValue: action.val };
                case 'ProductTypeValue':
                    return { ...state, ProductTypeValue: action.val };
                default:
                    return {...state}; 
            }
        },
        returnFirstLoad(state: any, action: any) {
            return {
                ...state,
                dataSource: action.dataSource, 
                CurrentStatus: action.CurrentStatus,
                DealType: action.DealType,
                ProductType: action.ProductType,
                height: action.height,
                CurrentStatusValue: action.CurrentStatusValue,
                DealTypeValue: action.DealTypeValue,
                ProductTypeValue: action.ProductTypeValue,
                hasMore: action.hasMore,
                refreshing: action.refreshing
            }; 
        }
      },
      effects: {
        *firstload(action: any, { call, put }: any) {
            const res = yield call(productService.getData,
                0,
                action.rows,
                [],
                0,
                0,
                0,
                true
            );
            console.log('4');
            console.log(res);
            yield put({ 
                type: 'returnFirstLoad', 
                dataSource: listviewdata.cloneWithRows(res.rData), 
                CurrentStatus: res.CurrentStatus,
                DealType: res.DealType,
                ProductType: res.ProductType,
                height: action.height,
                CurrentStatusValue: res.CurrentStatusValue,
                DealTypeValue: res.DealTypeValue,
                ProductTypeValue: res.ProductTypeValue,
                hasMore: res.hasMore,
                refreshing: false
            });
        },
        *changePicker(action: any , { call, put }: any) {
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
            console.log(res);
            yield put({ type: 'returnChangePicker', picker: action.picker, val: action.val});
        },
       
        *RefreshListView( action: any , { call, put }: any) {
            const v = yield call(productService.getData);
            console.log(v);
            console.log(action.picker);
            yield put({ type: 'test'});
        },

      }
  }; 
  