// import { routerRedux } from 'dva/router'; 
// const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'count',
    state: {
      record : 1,
      current: 1,
    },
    reducers: {
      add(state: any) {
          const newCurrent = state.current + 1;
          return { ...state,
            record: newCurrent > state.record ? newCurrent : state.record,
            current: newCurrent,
          };
        },
      minus(state: any) {
        return { ...state, current: state.current - 1};
      },
    },
}; 
