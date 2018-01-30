import * as React from 'react'; 
// import { Route } from 'dva/router';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile';

import Market from './Market';
import Product from './Product';
import Trade from './Trade';
import '../components/abs-tabs/index.less';

class Home extends React.Component<any, any> {
  private tabs = [
    { title: '市场', name: 'market' },
    { title: '产品', name: 'product' },
    { title: '交易', name: 'trade' },
  ];

  constructor(props: any) {
    super(props); 
    this.state = {
       index: this.getIndex()
    };   
  }

  getIndex(props?: any): number {  
    props = props || this.props;
    const { location } = props;
    
    if (location && location.state && location.state.type) { 
      const idx = this.tabs.findIndex((current) => current.name === location.state.type);
      return idx >= 0 ? idx : 0;
    } 
    return 0;
  }  

  render() { 
    const anchorTextWidth = 12; 
    return (
      <div className="abs-tabs">
        <Tabs
          initialPage={this.state.index} 
          tabs={this.tabs}
          // onChange={this.onChange}
          // onTabClick={(tab, index) => {}}
          tabBarUnderlineStyle={{ left: `${this.state.index * 33.333 + anchorTextWidth}%` }}
        >
          {/* <Route path="/market" component={Market} />
          <Route path="/product" component={Product} />
          <Route path="/trade" component={Trade} /> */}
          <Market/>
          <Product/>
          <Trade/>
        </Tabs>
      </div>
    );
  }
} 
 
export default connect()(Home);
