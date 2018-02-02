/*
 * @Author: ljliu kuizhang
 * @Date: 2018-02-01 14:40:22 
 * @Last Modified by: ljliu
 * @Last Modified time: 2018-02-02 18:10:12
 */

import * as React from 'react';
import { Router, Switch, Route , Redirect } from 'dva/router';  
import dynamic from 'dva/dynamic';  
// import asyncLoader from '../common/ayncLoader';  
// const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home'));    
import SpinnerLoader from '../common/components/spinner-loader';
import ContentLoader from '../common/components/content-loader';
import SpinkitLoader from '../common/components/spinkit-loader'; 
/**
 * RoutePageList 
 */
const ApiRoutePath =  process.env.REACT_APP_PUBLISH_PATH;
// Route Page Config List 
const RoutePageList = {
    HomePage: `${ApiRoutePath}home`,
    ProductDetailPage: `${ApiRoutePath}productdetail`,
    TradeDetailPage: `${ApiRoutePath}tradedetail`, 
    DemoPage: `${ApiRoutePath}demo`,
};
 
export default RoutePageList;

/**
 * Dva Model Router Component Register and Bind
 * Every Router must set the model and component bind
 * use webpack chunk code split, you can set the chunk like the below
 * *webpackChunkName:'home'*
 * @param param0 
 */
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
    component: () => import(/*webpackChunkName:'productdetail'*/'./views/product/ProductDetail'),
  });

  const TradeDetail = dynamic({
    app,
    models: () => [
      import('./models/tradedetail')
    ],
    component: () => import(/*webpackChunkName:'tradedetail'*/'./views/trade/TradeDetail')
  });
 
  return ( 
    <Router history={history}>
        <Switch>
          <Route exact={true} path={RoutePageList.HomePage} component={Home}/>  
          <Route exact={true} path={`${RoutePageList.ProductDetailPage}/:id`} component={ProductDetail}/>
          <Route exact={true} path={`${RoutePageList.TradeDetailPage}/:gradeId/:couponId`} component={TradeDetail} /> 
          <Route exact={true} path="/demo/spinnerloader" component={SpinnerLoader}/>
          <Route exact={true} path="/demo/contentloader" component={ContentLoader}/>
          <Route exact={true} path="/demo/spinkitloader" component={SpinkitLoader}/>
          <Redirect path="*" to={RoutePageList.HomePage} />
      </Switch>
    </Router>
  ); 
}  