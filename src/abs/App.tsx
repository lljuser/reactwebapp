import * as React from 'react';
import { Switch, Route , Redirect } from 'dva/router';
import ProductDetail from './ProductDetail'; 
import TradeDetail from './TradeDetail'; 
import asyncLoader from '../components/ayncLoader';

const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home'));

interface AppProp {
  name?: string;
  version?: string;
}

export default class App extends React.Component<AppProp, {}> {
   render() {
    return (
      <Switch>
          <Route exact={true} path="/:tab(market|trade|product)" component={AsyncHome}/>  
          <Route exact={true} path="/productdetail/:id" component={ProductDetail}/>
          <Route exact={true} path="/tradedetail/:gradeId/:couponId" component={TradeDetail} />
          <Redirect path="*" to="/market" />
      </Switch>
    );
   }
}
