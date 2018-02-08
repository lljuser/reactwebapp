/*
 * @Author: ljliu kuizhang
 * @Date: 2018-02-01 14:40:22 
 * @Last Modified by: ljliu
 * @Last Modified time: 2018-02-08 10:41:39
 */

import * as React from 'react';
import { Router, Route, Redirect } from 'dva/router';  
import dynamic from 'dva/dynamic';  
// import asyncLoader from '../common/ayncLoader';  
// const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home'));    
// import SpinnerLoader from '../common/components/spinner-loader';
// import ContentLoader from '../common/components/content-loader';
// import SpinkitLoader from '../common/components/spinkit-loader'; 
import { CSSTransitionGroup } from 'react-transition-group';
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
      <Route
        render={({location}) => (
          <CSSTransitionGroup
            transitionName="example"
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <div key={location.pathname}>
              <Route location={location} exact={true} path={RoutePageList.HomePage} component={Home}/>  
              <Route location={location} exact={true} path={`${RoutePageList.ProductDetailPage}/:id`} component={ProductDetail}/>
              <Route location={location} exact={true} path={`${RoutePageList.TradeDetailPage}/:gradeId/:couponId`} component={TradeDetail} />             
            </div>
            <Redirect path="*" to={RoutePageList.HomePage} />
          </CSSTransitionGroup> 
        )} 
      />
    </Router>
  ); 
}  