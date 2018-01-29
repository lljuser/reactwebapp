import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel'; 
import ABSChartMarket from '../components/abs-chart';
import MarketTable from './market/MarketTable';

class MarketComponent extends React.Component<any, any> { 

  render() { 
    return (
        <React.Fragment>
            <ABSPanel title="市场概要" >
                <MarketTable marketSummary={this.props.marketSummary} />   
            </ABSPanel> 
            <ABSPanel title="发行统计">
                <ABSChartMarket data={this.props.chart} />
            </ABSPanel>
        </React.Fragment>
    );
  }
}

export default connect()(MarketComponent);
