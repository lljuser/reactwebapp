import * as React from 'react';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel';
import ABSChartMarket from '../components/abs-chart';
import MarketTable from './MarketTable';

function mapStateToProps(state: any) {
  return state.market;
}

class MarketComponent extends React.Component<any, any> {
  componentDidMount() {
    if (this.props.marketSummary && this.props.marketSummary.length > 0) {
      return;
    }

    this.props.dispatch({ type: 'market/fetch' });
  }

  render() {
    return (
      <React.Fragment>
        <ABSPanel title="市场概要" >
          <MarketTable marketSummary={this.props.marketSummary} />
        </ABSPanel>
        <ABSPanel title="发行统计">
          <ABSChartMarket data={this.props.chart} style={{ height: '400px' }} />
        </ABSPanel>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(MarketComponent);
