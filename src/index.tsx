/*
 * @Author: ljliu
 * @Date: 2018-02-01 14:39:36 
 * @Last Modified by: ljliu
 * @Last Modified time: 2018-02-08 18:08:18
 */

import dva from 'dva';
import createLoading from 'dva-loading';
import defaultHistory from './common/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 
import { RouterConfig } from './abs/RouterConfig';  
import 'amfe-flexible'; 
import './components/theme.less';
// import { createLogger } from 'redux-logger';
 
/**
 *  1. Initialize
 */
const app = dva({
  // use default history
  history: defaultHistory, 
  // register middleware
  onAction: [
    // createLogger(), // logger publish remove 
  ]
});

/**
 * 2. Register middleware
 */
app.use(createLoading());
// appDva.use(createLogger());

/**
 * 3. Model |move to ruoterconfig
 */ 
// appDva.model(countModel);

/**
 * 4. Router Setting
 */
app.router(RouterConfig);

/**
 *  5. App Start
 */ 
app.start('#root');  

// developer mode | local cache
registerServiceWorker();
