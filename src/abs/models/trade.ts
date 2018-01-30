// import { routerRedux } from 'dva/router'; 
// const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
import { ListView } from 'antd-mobile';

const listviewdata = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

export default {
    namespace: 'trade',
    state: {
        dataSource: listviewdata, // ListView组件数据源
        loading: true,
        height: document.documentElement.clientHeight,
        hasMore: true, // 是否有更多内容
        useBodyScroll: true, // 是否使用html的body作为滚动容器
        info: '', // 结尾信息
        refreshing: true,
        initialListSize: 15, // 组件刚挂载的时候渲染数据行数
        rows: 15, // 数据查询条数
        pageIndex: 1, // 数据查询页数
        rData: [], // table数据
        ratingValues: [], // 评级value集合
        ratingList: [{
            label: '2013',
            value: '2013',
        },
        {
            label: '2014',
            value: '2014',
        }]
    },
    reducers: {
        /**
         * Picker选择器选择项变更事件处理
         * 
         * @param {*} state 选择项变更传入state
         * @param {*} action 选择项变更动作
         * @returns 
         */
        returnChangePicker(state: any, action: any) {
            switch (action.picker) {
                case 'ratingValues': // 评级
                    console.log(action.val);
                    return {
                        ...state,
                        ratingValues: action.val,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        endInfo: action.endInfo,
                        isLoading: action.isLoading
                    };
                case 'couponValues':
                    console.log(action.val);
                    return {
                        ...state,
                        couponValues: action.val,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        endInfo: action.endInfo,
                        isLoading: action.isLoading
                    };
                case 'walbuckValues':
                    return {
                        ...state,
                        walbuckValues: action.val,
                        dataSource: action.dataSource,
                        rData: action.rData,
                        hasMore: action.hasMore,
                        pageIndex: action.pageIndex,
                        refreshing: action.refreshing,
                        endInfo: action.endInfo,
                        isLoading: action.isLoading
                    };
                default:
                    return { ...state };
            }
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
        *onPickerChange(action: any, { call, put }: any) {
            console.log(action);
            yield call();
        },
        *componentDidMount(action: any, { call, put }: any) {
            console.log(action);
        },
    }
};
