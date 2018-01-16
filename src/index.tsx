import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import App from './BasicExample';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
// alert(process.env.REACT_APP_API_ADDRESS);
registerServiceWorker();
