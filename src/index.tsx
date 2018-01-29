import * as React from 'react';
import dva from 'dva';
import { Router } from 'dva/router'; 
import defaultHistory from './components/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 
import App from './abs/App';  
import countModel from './models/count';
import productModel from './models/product';

// 1. Initialize
const app = dva({
  history: defaultHistory,
});

// 2. Model 
app.model(countModel);
app.model(productModel);

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
