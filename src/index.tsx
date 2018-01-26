import dva from 'dva';
import createLoading from 'dva-loading';
import defaultHistory from './components/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 
import routerConfig from './abs/RouterConfig';   

// 1. Initialize
const app = dva({
  history: defaultHistory,
});
app.use(createLoading());

// 2. Model 
// app.model(countModel);

// 3. Router
app.router(({props}: any) =>  routerConfig(props));

// 4. Start
app.start('#root');  

registerServiceWorker();
