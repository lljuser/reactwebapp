import * as React from 'react';
import * as ReactDOM from 'react-dom'; 
import App from './abs/App'; 
import { Router } from 'react-router-dom';
import history from './components/http/request/listener';
import registerServiceWorker from './registerServiceWorker'; 

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router> ,  
  document.getElementById('root') as HTMLElement
);
// alert(process.env.REACT_APP_API_ADDRESS);
registerServiceWorker();
