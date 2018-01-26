import * as React from 'react';
import dva from 'dva';
import { Router } from 'dva/router'; 
import createLoading from 'dva-loading';
import defaultHistory from './components/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 
import App from './abs/App';  
import countModel from './models/count';

// 1. Initialize
const app = dva({
  history: defaultHistory,
});
app.use(createLoading());

// 2. Model 
app.model(countModel);

// 3. Router
app.router((props: {history: History}) => ( 
    <Router history={props.history}> 
      <App />
    </Router>
  )
);

// 4. Start
app.start('#root');  

registerServiceWorker();
