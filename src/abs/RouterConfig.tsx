import * as React from 'react';
import { Router, Switch, Route , Redirect } from 'dva/router';  
import dynamic from 'dva/dynamic';  

// import asyncLoader from '../components/ayncLoader'; 
// const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home')); 

const ApiRoutePath =  process.env.REACT_APP_PUBLISH_PATH;
// Route Page Config List 
const RoutePageList = {
    HomePage: `${ApiRoutePath}home`,
    ProductDetailPage: `${ApiRoutePath}productdetail`,
    TradeDetailPage: `${ApiRoutePath}tradedetail/`, 
};
alert(JSON.stringify(RoutePageList));
export default RoutePageList;

export function RouterConfig({ history, app }: any) {  
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
          <Route exact={true} path={RoutePageList.HomePage} component={Home}/>  
          <Route exact={true} path={`${RoutePageList.ProductDetailPage}:id`} component={ProductDetail}/>
          <Route exact={true} path={`${RoutePageList.TradeDetailPage}:gradeId/:couponId`} component={TradeDetail} />
          <Redirect path="*" to={RoutePageList.HomePage} />
      </Switch>
    </Router>
  ); 
}  