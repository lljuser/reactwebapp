import * as React from 'react';
import { BrowserRouter as Router,  Route,  Link } from 'react-router-dom'; 
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Market from './abs/Market';
import Product from './abs/Product';
import Trade from './abs/Trade';

const tabs = [
  { title: <Link to="/market"><Badge>市场</Badge></Link> },
  { title: <Link to="/product"><Badge text={'9'}>产品</Badge></Link> },
  { title: <Link to="/trade"><Badge dot={true}>交易</Badge></Link> },
]; 
 
const TabExample = () => (
  <Router>
    <div>
      <Tabs 
            tabs={tabs} 
            initialPage={1}  
            // onChange={(tab, index) => { console.log('onChange', index, tab); }}  
            // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }} 
      >
        <Route exact={true} path="/market" component={Market}/>
        <Route path="/product" component={Product}/>
        <Route path="/trade" component={Trade}/>
      </Tabs>
      <WhiteSpace /> 
    </div>
  </Router>
);  
 
export default TabExample;  