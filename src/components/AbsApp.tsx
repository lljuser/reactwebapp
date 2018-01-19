import * as React from 'react';
// import { HashRouter as Router,  Route } from 'react-router-dom'; 
import { Tabs } from 'antd-mobile';
import Market from './abs/Market';
import Product from './abs/Product';
import Trade from './abs/Trade';

const tabs = [
  { title: '市场 ', name: 'market' },
  { title: '产品', name: 'product' },
  { title: '交易', name: 'trade' },
];   

interface AppProp {
  name?: string;
  version?: string;
}

class App extends React.Component<AppProp, {}> {
  render() {
    return (
      <div> 
        <Tabs 
          initialPage={0}
          tabs={tabs} 
        >  
          <Market title="市场"/> 
          <Trade title="交易"/>
          <Product title="产品"/> 
        </Tabs>
      </div>  
    );
  }
}
 
export default App;  