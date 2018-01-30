import dva from 'dva';
import createLoading from 'dva-loading';
import defaultHistory from './common/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 
import routerConfig from './abs/RouterConfig';  
import 'amfe-flexible';
import './public/theme.less';
// import { createLogger } from 'redux-logger';

// 1. Initialize
const appDva = dva({
  history: defaultHistory, 
  // onAction: [
  //   createLogger(), // logger publish remove 
  // ]
});
appDva.use(createLoading());
// appDva.use(createLogger());

// 2. Model |move to ruoterconfig
// appDva.model(countModel);

// 3. Router
appDva.router(({history, app}: any) =>  routerConfig({history, app}));

// 4. Start
appDva.start('#root');  

registerServiceWorker();
