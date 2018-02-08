/*
 * @Author: ljliu kuizhang
 * @Date: 2018-02-01 14:40:22 
 * @Last Modified by: ljliu
 * @Last Modified time: 2018-02-08 17:40:00
 */

import * as React from 'react';
import { Router, Route, Switch } from 'dva/router';  
import dynamic from 'dva/dynamic';  
// import asyncLoader from '../common/ayncLoader';  
// const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home'));    
import SpinnerLoader from '../common/components/spinner-loader';
// import ContentLoader from '../common/components/content-loader';
import SpinkitLoader from '../common/components/spinkit-loader'; 
import { CSSTransitionGroup } from 'react-transition-group';
/**
 * RoutePageList 
 */
const ApiRoutePath =  process.env.REACT_APP_PUBLISH_PATH;
// Route Page Config List 
const RoutePageList = {
    HomePage: `${ApiRoutePath}`,
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
        <Route
          render={({location}) => (
            <>
              <CSSTransitionGroup
                transitionName="abstransition"
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={350}
                transitionLeaveTimeout={350}
              >
                <div key={location.pathname}>
                  <Route location={location} exact={true} path={RoutePageList.HomePage} component={Home}/>  
                  <Route location={location} exact={true} path={`${RoutePageList.ProductDetailPage}/:id`} component={ProductDetail}/>
                  <Route location={location} exact={true} path={`${RoutePageList.TradeDetailPage}/:gradeId/:couponId`} component={TradeDetail} />  
                  <Route location={location} exact={true} path="/demo/spinnerloader" component={SpinnerLoader} /> 
                  <Route location={location} exact={true} path="/demo/spinkitLoader" component={SpinkitLoader} />                          
                </div> 
              </CSSTransitionGroup> 
             
            </>
          )} 
        />
      </Switch> 
    </Router>  
  ); 
}  