import * as React from 'react'; 
import { Route } from 'dva/router';
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

    this.onChange = this.onChange.bind(this);
  }

  getIndex(props?: any): number {
    props = props || this.props;
    const { match } = props;
    if (match.params && match.params.tab) {
      const idx = this.tabs.findIndex((current) => current.name === match.params.tab);
      return idx >= 0 ? idx : 0;
    }

    return 0;
  }

  componentWillReceiveProps(next: any) {
    let nextIndex = this.getIndex(next);
    this.setState({
      index: nextIndex
    });
  }

  onChange = (p, index) => {
    const { history } = this.props;
    history.push(`/${p.name}`);
  }

  render() {
    // 定义tab项内容的真实宽度
    const anchorTextWidth = 12;

    return (
      <div className="abs-tabs">
        <Tabs
          initialPage={this.state.index}
          page={this.state.index}
          tabs={this.tabs}
          onChange={this.onChange}
          // onTabClick={(tab, index) => {}}
          tabBarUnderlineStyle={{ left: `${this.state.index * 33.333 + anchorTextWidth}%` }}
        >
          <Route path="/market" component={Market} />
          <Route path="/product" component={Product} />
          <Route path="/trade" component={Trade} />
        </Tabs>
      </div>
    );
  }
} 
 
export default connect()(Home);
