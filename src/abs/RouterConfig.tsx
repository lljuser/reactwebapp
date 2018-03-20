/*
 * @Author: ljliu kuizhang
 * @Date: 2018-02-01 14:40:22 
 * @Last Modified by: ljliu
 * @Last Modified time: 2018-02-11 11:29:12
 */

import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';  
import dynamic from 'dva/dynamic';  
// import asyncLoader from '../common/ayncLoader';   
// const AsyncHome = asyncLoader(import(/*webpackChunkName:'home'*/'./Home'));    
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    '0': '#ffc446',
    '0.5': '#ffc446',
    '1.0': '#ffc446', 
  },
  shadowBlur: 5,
});

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
 * App Component|Router Component
 */
export class App extends React.Component<any, any> { 
  Home = this.createDynamicComponent({ 
    models: () => [ 
      import('./models/market'), 
      import('./models/product'), 
      import('./models/trade')
    ],
    component: () => import(/*webpackChunkName:'home'*/'./views/Home'),
  });

  ProductDetail = this.createDynamicComponent({ 
    models: () => [
      import('./models/productdetail')
    ],
    component: () => import(/*webpackChunkName:'productdetail'*/'./views/product/ProductDetail'),
  });

  TradeDetail = this.createDynamicComponent({ 
    models: () => [
      import('./models/tradedetail')
    ],
    component: () => import(/*webpackChunkName:'tradedetail'*/'./views/trade/TradeDetail')
  });

  constructor(props: any) {
    super(props); 
  } 

  createDynamicComponent(config: any) {
    let app = this.props.app; 
    return dynamic({
      app,
      models: config.models,
      component: config.component,
      LoadingComponent: TopBarProgress
    });
  } 

  render() {
    return (
      <Router history={this.props.history}>
        <Switch> 
          <Route exact={true} path={RoutePageList.HomePage} component={this.Home}/>  
          <Route exact={true} path={`${RoutePageList.ProductDetailPage}/:id`} component={this.ProductDetail}/>
          <Route exact={true} path={`${RoutePageList.TradeDetailPage}/:gradeId/:couponId`} component={this.TradeDetail} />   
          <Redirect path="*" to={RoutePageList.HomePage}/> 
        </Switch> 
      </Router>  
    );
  }
}

/**
 * Dva Model Router Component Register and Bind
 * Every Router must set the model and component bind
 * use webpack chunk code split, you can set the chunk like the below
 * *webpackChunkName:'home'*
 * @param param0 
 */
export function RouterConfig({ history, app }: any) {   
  return (  
    <App history={history} app={app}/> 
  ); 
}  
