import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { Tabs } from 'antd-mobile';

import Market from './Market';
import Product from './Product';
import Trade from './Trade';

import './App.css';

const tabs = [
  { title: '市场', name: 'market' },
  { title: '产品', name: 'product' },
  { title: '交易', name: 'trade' },
];

interface AppProp {
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

  getIndex(props?: RouteComponentProps<AppProp>): number {
    props = props || this.props;
    const { match } = props;
    if (match.params && match.params.tab) {
      const idx = tabs.findIndex((current) => current.name === match.params.tab);
      return idx >= 0 ? idx : 0;
    }

    return 0; 
  }

  componentWillReceiveProps(next: RouteComponentProps<AppProp>) {
    let nextIndex = this.getIndex(next);
    this.setState({
      index: nextIndex
    });
  }

  onChange = (p, index) => {
    const { history } = this.props;
    history.push(`/${p.name}`, { index: index });
  }

  render() {
    // 定义tab项内容的真实宽度
    const anchorTextWidth = 30;
    return (
        <Tabs
          initialPage={this.state.index}
          page={this.state.index}
          tabs={tabs}
          tabBarBackgroundColor={'#000000'}
          tabBarInactiveTextColor={'#ffffff'}
          tabBarActiveTextColor={'#ffc446'}
          onChange={this.onChange}
          tabBarUnderlineStyle={{ borderColor: '#ffc446', width: '40px', left: `${this.state.index * 100 + anchorTextWidth}px` }}
        >
          <Route path="/market" component={Market} />
          <Route path="/product" component={Product} />
          <Route path="/trade" component={Trade} />
        </Tabs>
    );
  }
}

export default App;  