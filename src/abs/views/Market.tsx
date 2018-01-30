import * as React from 'react';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel';
import ABSChartMarket from '../components/abs-chart'; 
import MarketTable from './MarketTable';  
import { Button } from 'antd-mobile'; 

class MarketComponent extends React.Component<any, any> { 
    constructor(props: any) {
        super(props);
        this.onChangTable = this.onChangTable.bind(this);
    }

    componentDidMount() {
        if (this.props.marketSummary && this.props.marketSummary.length > 0) {
            return;
        }

        this.props.dispatch({ type: 'market/fetch' });
    }
 
    onChangTable(e: any) {
        e.preventDefault();
        this.props.onChangeTab(1, 'ABN');
    }

    render() {  
        return (
                <React.Fragment>
                <ABSPanel title="Demo" >
                    <Button type="primary" onClick={this.onChangTable} >Demo</Button>
                </ABSPanel> 
                <ABSPanel title="市场概要" >
                    <MarketTable marketSummary={this.props.marketSummary} />   
                </ABSPanel> 
                <ABSPanel title="发行统计">
                    <ABSChartMarket data={this.props.chart} style={{height: '400px'}} />
                </ABSPanel>
            </React.Fragment>
        );
    }   
} 

function mapStateToProps(state: any) {
    return state.market;
} 
  
export default connect(mapStateToProps)(MarketComponent);
