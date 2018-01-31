import * as React from 'react';
import { Router, Switch, Route , Redirect } from 'dva/router';  
import dynamic from 'dva/dynamic'; 
import ApiRoutePath from './config/api';
// import asyncLoader from '../components/ayncLoader'; 
// const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home'));  

function RouterConfig({ history, app }: any) {  
  const Home = dynamic({
    app,
    models: () => [ 
      import('./models/market'), 
      import('./models/product'), 
      import('./models/trade')
    ],
    component: () => import(/*webpackChunkName:'home'*/'./views/Home'),
  });

  const ProductDetail = dynamic({
    app, 
    models: () => [
      import('./models/productdetail')
    ],
    component: () => import('./views/ProductDetail'),
  });

  const TradeDetail = dynamic({
    app,
    models: () => [
      import('./models/tradedetail')
    ],
    component: () => import('./views/TradeDetail')
  });

  return (
    <Router history={history}>
      <Switch>
          <Route exact={true} path={`${ApiRoutePath}/home`} component={Home}/>  
          <Route exact={true} path={`${ApiRoutePath}/productdetail/:id`} component={ProductDetail}/>
          <Route exact={true} path={`${ApiRoutePath}/tradedetail/:gradeId/:couponId`} component={TradeDetail} />
          <Redirect path="*" to={`${ApiRoutePath}/home`} />
      </Switch>
    </Router>
  ); 
}

export default RouterConfig;
