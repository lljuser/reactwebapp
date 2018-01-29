import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel';
import MarketTable from './market/MarketTable';
import ABSChartMarket from '../components/abs-chart';

interface Props {
    title: string;
}
const marketProps = {
    title: '市场概要',
    data: {}
};

class MarketComponent extends React.Component<Props, any> { 

  render() { 
    return (
        <React.Fragment>
            <ABSPanel {...marketProps} >
                <MarketTable />   
            </ABSPanel> 
            <ABSPanel title="发行统计">
                <ABSChartMarket />
            </ABSPanel>
        </React.Fragment>
    );
  }
}

export default connect()(MarketComponent);
