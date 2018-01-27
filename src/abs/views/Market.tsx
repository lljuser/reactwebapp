import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel/abs-panel';
import ABSTableMarket from '../components/abs-table/abs-table-market';
import ABSChartMarket from '../components/abs-chart/abs-chart-market';

interface Props {
    title: string;
}
const marketProps = {
    title: '市场概要',
    data: {}
};

class MarketComponent extends React.Component<Props, any> { 
  constructor(props: any) {
    super(props);
    console.log('new MarketComponent()');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate MarketComponent');
    return false;
  }

  render() {
    console.log('render MarketComponent');
    return (
        <React.Fragment>
            <ABSPanel {...marketProps} >
                <ABSTableMarket />   
            </ABSPanel> 
            <ABSPanel title="发行统计">
                <ABSChartMarket />
            </ABSPanel>
        </React.Fragment>
    );
  }
}

export default connect()(MarketComponent);
