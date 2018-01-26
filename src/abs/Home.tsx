import * as React from 'react'; 
import { Route } from 'dva/router';
import { connect } from 'dva';
import { Tabs, Badge } from 'antd-mobile';

import Market from './Market';
import Product from './Product';
import Trade from './Trade';

import './components/abs-tabs/abs-tabs.less';

const tabs = [
  { title: '市场', name: 'market' },
  { title: '产品', name: 'product' },
  { title: '交易', name: 'trade' },
];

interface AppProp {
  // 对应tab选项卡中的 name 字段
  tab: string;
}

interface AppState {
  index: number;
}

class App extends React.Component<RouteComponentProps<AppProp>, AppState> {
  constructor(props: RouteComponentProps<AppProp>) {
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
    const anchorTextWidth = 30;
    this.tabs = [
      { title: <Badge text={this.props.count.current}>市场</Badge>, name: 'market' },
      { title: '产品', name: 'product' },
      { title: '交易', name: 'trade' },
    ];  

    return (
      <div className="abs-tabs">
        <Tabs
          initialPage={this.state.index}
          page={this.state.index}
          tabs={this.tabs}
          tabBarBackgroundColor={'#000000'}
          tabBarInactiveTextColor={'#ffffff'}
          onChange={this.onChange}
          onTabClick={(tab, index) => { 
             this.props.dispatch({ type: 'count/add' });
          }}
          tabBarUnderlineStyle={{ borderColor: '#ffc446', width: '40px', left: `${this.state.index * 100 + anchorTextWidth}px` }}
        >
          <Route path="/market" component={Market} />
          <Route path="/product" component={Product} />
          <Route path="/trade" component={Trade} />
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    count: state.count,
  };
}

export default connect(mapStateToProps)(App);

// export default App;  