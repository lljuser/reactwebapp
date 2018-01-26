import dva from 'dva';
import createLoading from 'dva-loading';
import defaultHistory from './components/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 
import routerConfig from './abs/RouterConfig';   

// 1. Initialize
const appDva = dva({
  history: defaultHistory,
});
appDva.use(createLoading());

// 2. Model |move to ruoterconfig
// appDva.model(countModel);

// 3. Router
appDva.router(({history, app}: any) =>  routerConfig({history, app}));

// 4. Start
appDva.start('#root');  

registerServiceWorker();
