import * as React from 'react';
import { Switch, Route , Redirect } from 'react-router-dom';
import ProductDetail from './ProductDetail'; 
import Loadable from 'react-loadable';
import Loading from '../components/loading';

const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: Loading
});

interface AppProp {
  name?: string;
  version?: string;
}

export default class App extends React.Component<AppProp, {}> {
   render() {
    return (
      <Switch>
          <Route exact={true} path="/:tab(market|trade|product)" component={AsyncHome}/>  
          <Route exact={true} path="/productDetail/:id" component={ProductDetail}/> 
          <Redirect path="*" to="/market" />
      </Switch>
    );
   }
}
