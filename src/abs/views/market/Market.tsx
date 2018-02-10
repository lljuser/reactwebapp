import * as React from 'react';
import { connect } from 'dva'; 
import ABSPanel from '../components/abs-panel';
import ABSChartMarket from '../components/abs-chart'; 
import MarketTable from './MarketTable';   
import ABSContainer from '../components/abs-container/index';

import { StyleSheet, css } from 'aphrodite'; 
import { slideLeftReturn, slideDownReturn } from 'react-magic';

const styles = StyleSheet.create({
    leftIn: {
        animationName: slideLeftReturn,
        animationDuration: '1s'
    },
    downIn: {
        animationName: slideDownReturn,
        animationDuration: '1s'
    }
}); 

class MarketComponent extends React.Component<any, any> { 
    constructor(props: any) {
        super(props); 
    }

    componentDidMount() {
        if (this.props.marketSummary && this.props.marketSummary.length > 0) {
            return;
        }

        this.props.dispatch({ type: 'market/fetch' });
    } 
  
    render() {  
        return (
            <ABSContainer> 
                <div className={css(styles.leftIn)}>
                    <ABSPanel title="市场概要" >
                        <MarketTable marketSummary={this.props.marketSummary} onChangeTab={this.props.onChangeTab} />   
                    </ABSPanel> 
                </div>
                <div className={css(styles.downIn)}>
                    <ABSPanel title="发行统计">
                        <ABSChartMarket data={this.props.chart} style={{height: '400px'}} />
                    </ABSPanel>
                </div> 
            </ABSContainer>
        );
    }   
} 

function mapStateToProps(state: any) {
    return state.market;
} 
  
export default connect(mapStateToProps)(MarketComponent);
