/*
 * @Author: ljliu
 * @Date: 2018-02-01 14:39:36 
 * @Last Modified by: ljliu
 * @Last Modified time: 2018-02-02 14:25:07
 */

import dva from 'dva';
import createLoading from 'dva-loading';
import defaultHistory from './common/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 
import { RouterConfig } from './abs/RouterConfig';  
import 'amfe-flexible'; 
import './common/components/theme.less';
// import { createLogger } from 'redux-logger';
 
/**
 *  1. Initialize
 */
const appDva = dva({
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
appDva.use(createLoading());
// appDva.use(createLogger());

/**
 * 3. Model |move to ruoterconfig
 */ 
// appDva.model(countModel);

/**
 * 4. Router Setting
 */
appDva.router(RouterConfig);

/**
 *  5. App Start
 */ 
appDva.start('#root');  

// developer mode | local cache
registerServiceWorker();
