import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel'; 
import ABSChartMarket from '../components/abs-chart';
import MarketTable from './market/MarketTable';  

class MarketComponent extends React.Component<any, any> {   
    componentDidMount() {
        if (this.props.loaded) {
            return;
        }

        this.props.dispatch({type: 'marketChart/fetch'});
    } 

    render() { 
        return (
            <React.Fragment>
                <ABSPanel title="市场概要" >
                    <MarketTable />   
                </ABSPanel> 
                <ABSPanel title="发行统计">
                    <ABSChartMarket data=""/>
                </ABSPanel>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: any) {
    return state.market;
}

export default connect(mapStateToProps)(MarketComponent);
