import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/AbsApp'; 
import registerServiceWorker from './registerServiceWorker'; 

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
// alert(process.env.REACT_APP_API_ADDRESS);
registerServiceWorker();
