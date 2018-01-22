import * as React from 'react';
import * as ReactDOM from 'react-dom'; 
import App from './abs/App'; 
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker'; 

ReactDOM.render(
  <Router>
    <App />
  </Router> ,  
  document.getElementById('root') as HTMLElement
);
// alert(process.env.REACT_APP_API_ADDRESS);
registerServiceWorker();
