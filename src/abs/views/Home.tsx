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
    this.renderTabBar = this.renderTabBar.bind(this);
    this.goToTab = this.goToTab.bind(this);
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

  renderTabBar(props: any) { 
    return ( 
        <Tabs.DefaultTabBar 
          {...props} 
          renderUnderline={(ulProps) => {
            const { style, ...otherProps } = ulProps;
            const ulStyle = {
              ...style,
              border: 'none',
            };
            return (
              <div 
                style={ulStyle} 
                {...otherProps}
              >
                <div 
                  style={{
                    width: 50,
                    height: 2, 
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                /> 
              </div>
            );
          }}
        
        /> 
     );
  }

  goToTab(index: number, product: any) {
    this.setState({ 
      index: index, 
      product: product
    });
  }

  render() {   
    return (
      <div className="abs-tabs">
        <Tabs
          initialPage={this.state.index} 
          tabs={this.tabs} 
          renderTabBar={this.renderTabBar}
          page={this.state.index}
          onChange={(tab, index) => { 
            this.setState({ index: index });
          }} 
          useOnPan={false} 
        >
          {/* <Route path="/market" component={Market} />
          <Route path="/product" component={Product} />
          <Route path="/trade" component={Trade} /> */}
          <Market onChangeTab={this.goToTab}/>
          <Product productType={this.state.productType}/>
          <Trade/>
        </Tabs>
      </div>
    );
  }
} 
 
export default connect()(Home);
