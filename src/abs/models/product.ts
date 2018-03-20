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
        scrollTop: 0,
        dataSource: listviewdata,   // ListView组件数据源
        currentStatus: [],          // 状态的picker数据
        currentStatusValue: [],     // 状态的picker选中值
        dealType: [],               // 产品的picker数据
        dealTypeValue: [],          // 产品的picker选中值
        productType: [],            // 市场的picker数据
        productTypeValue: [],       // 市场的picker选中值
        refreshing: true,           
        loading: true,
        height: document.documentElement.clientHeight,
        useBodyScroll: false,       // 是否使用html的body作为滚动容器
        hasMore: true,              // 是否有更多内容
        initialListSize: 15,        // 组件刚挂载的时候渲染数据行数
        info: '',                   // 结尾信息
        rows: 15,                   // 数据查询条数
        pageIndex: 0,               // 数据查询页数
        rData: [],                  // 查询所得所有数据
        firstloading: true          // 控制第一次加载时显示遮蔽
        },
      reducers: {
        /**
         * 返回picker改变后获取到的数据
         */
        returnChangePicker(state: any, action: any) {
            switch ( action.picker ) {
                case 'CurrentStatusValue':
                    return { 
                        ...state, 
                        productTypeValue: action.productTypeValue,
                        dealTypeValue: action.dealTypeValue,
                        currentStatusValue: action.val,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        info: action.info,
                        loading: action.loading,
                        currentStatus: action.currentStatus,
                        dealType: action.dealType,
                        productType: action.productType,
                        scrollTop: action.scrollTop
                    };
                case 'DealTypeValue':
                    return { 
                        ...state, 
                        productTypeValue: action.productTypeValue,
                        dealTypeValue: action.val,
                        currentStatusValue: action.currentStatusValue,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        info: action.info,
                        loading: action.loading,
                        currentStatus: action.currentStatus,
                        dealType: action.dealType,
                        productType: action.productType,
                        scrollTop: action.scrollTop
                    };
                case 'ProductTypeValue':
                    return { 
                        ...state, 
                        productTypeValue: action.val,
                        dealTypeValue: action.dealTypeValue,
                        currentStatusValue: action.currentStatusValue,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        info: action.info,
                        loading: action.loading,
                        currentStatus: action.currentStatus,
                        dealType: action.dealType,
                        productType: action.productType,
                        scrollTop: action.scrollTop
                    };
                case 'Multi':
                    return {
                        ...state, 
                        productTypeValue: action.productTypeValue,
                        dealTypeValue: action.dealTypeValue,
                        currentStatusValue: action.currentStatusValue,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        info: action.info,
                        loading: action.loading,
                        currentStatus: action.currentStatus,
                        dealType: action.dealType,
                        productType: action.productType,
                        scrollTop: action.scrollTop
                    };
                default:
                    return {...state}; 
            }
        },
        /**
         * 返回第一次加载后的数据
         */
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
        /**
         * 返回ListView中内容
         */
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
        /**
         * 返回ListView底部状态
         */
        changeListState(state: any, action: any) {
            return {
                ...state,
                info: action.info,
                loading: action.loading,
                refreshing: action.refreshing
            }; 
        },
        /**
         * 返回ScrollTop和第一次挂载组件渲染行数initialListSize
         */
        updateScrollTop(state: any, action: any) {
            return {
                ...state,
                scrollTop: action.scrollTop,
                initialListSize: action.initialListSize
            };
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
        /**
         * 第一次加载数据
         */
        *firstload(action: any, { call, put }: any) {
            yield put({type: 'showLoading', firstloading: true});
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

            yield put({type: 'showLoading', firstloading: false});
        },
        /**
         * 改变picker的值
         */
        *changePicker(action: any , { call, put }: any) {
            yield put({type: 'changeListState', info: '正在加载...' , loading: true, refreshing: false});

            let currentStatusValue = action.currentStatusValue === undefined ? 0 : action.currentStatusValue[0];
            let dealTypeValue = action.dealTypeValue === undefined ? 0 : action.dealTypeValue[0];
            let productTypeValue = action.productTypeValue === undefined ? 0 : action.productTypeValue[0];

            if (action.picker === 'CurrentStatusValue') {
                currentStatusValue = action.val[0];
            }
            if (action.picker === 'DealTypeValue') {
                dealTypeValue = action.val[0];
            }
            if (action.picker === 'ProductTypeValue') {
                productTypeValue = action.val[0];
            }
            
            const res = yield call([productService, productService.getData],
                0,
                action.rows,
                [],
                currentStatusValue,
                dealTypeValue,
                productTypeValue,
                true
            );
            let ishavedealTypeValue = false;
            let ishaveproductTypeValue = false;
            let ishavecurrentStatusValue = false;
            res.DealType[0].forEach(item => {
                if ( item.value === dealTypeValue ) {
                    ishavedealTypeValue = true;
                }
            });
            res.ProductType[0].forEach(item => {
                if ( item.value === productTypeValue ) {
                    ishaveproductTypeValue = true;
                }
            });
            res.CurrentStatus[0].forEach(item => {
                if ( item.value === currentStatusValue ) {
                    ishavecurrentStatusValue = true;
                }
            });

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
                loading: false,
                productTypeValue: ishaveproductTypeValue ? [productTypeValue] : [0],
                dealTypeValue: ishavedealTypeValue ? [dealTypeValue] : [0],
                currentStatusValue: ishavecurrentStatusValue ? [currentStatusValue] : [0],
                currentStatus: res.CurrentStatus,
                dealType: res.DealType,
                productType: res.ProductType,
                scrollTop: 0
            });
        },
        /**
         * 获取列表数据
         */
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
        /**
         * 刷新列表
         */
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
        /**
         * 保存滚轮滚动位置
         */
        *onScroll(action: any, { call, put }: any) {
            yield put({ type: 'updateScrollTop', scrollTop: action.scrollTop, initialListSize: action.initialListSize });
        },
      }
  }; 
  