import * as React from 'react';
import { Router, Switch, Route , Redirect } from 'dva/router';  
import dynamic from 'dva/dynamic'; 
// import asyncLoader from '../components/ayncLoader';
// const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home'));  

function RouterConfig({ history, app }: any) {  
  const Home = dynamic({
    app,
    models: () => [ 
      import('./models/market'), 
      import('./models/product'), 
      import('./models/trade'), 
    ],
    component: () => import(/*webpackChunkName:'home'*/'./views/Home'),
  });

  const ProductDetail = dynamic({
    app, 
    component: () => import('./views/ProductDetail'),
  });

  return (
    <Router history={history}>
      <Switch>
          <Route exact={true} path="/home" component={Home}/>  
          <Route exact={true} path="/productdetail/:id" component={ProductDetail}/>
          <Redirect path="*" to="/home" />
      </Switch>
    </Router>
  ); 
}

export default RouterConfig;
