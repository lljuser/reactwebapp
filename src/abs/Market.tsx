import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import ABSPanel from './components/abs-panel/abs-panel';
import ABSTableMarket from './components/abs-table/abs-table-market';
import ABSChartMarket from './components/abs-chart/abs-chart-market';

interface Props {
    title: string;
}
  
export default class MarketComponent extends React.Component<Props, any> {
    timerID: any; 
    constructor(props: Props) {
        super(props); 
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = this.updateTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateTimer() {
        return setInterval(
            () => {
                this.setState({
                    date: new Date()
                });
            },
            1000
          );
    } 

    render() { 
        return (
            <div>
                <ABSPanel title="市场概要" >
                    <ABSTableMarket />   
                </ABSPanel>
                <div><span>{this.state.date.toLocaleTimeString()}.</span></div>
                <ABSPanel title="发行统计">
                    <ABSChartMarket />
                </ABSPanel>
            </div>
        );
    }
}
