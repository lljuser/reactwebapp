import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/AbsApp';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router-dom';
import history from './http/request/listener';

ReactDOM.render(
  <Router history={history}>
      <Route exact={true} path="/(market|product|trade)?" component={App} />
  </Router>,
  document.getElementById('root') as HTMLElement
);
// alert(process.env.REACT_APP_API_ADDRESS);
registerServiceWorker();
