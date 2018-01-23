import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import ABSPanel from './components/abs-panel/abs-panel';
import ABSTableMarket from './components/abs-table/abs-table-market';
import ABSChartMarket from './components/abs-chart/abs-chart-market';

interface Props {
    title: string;
}
  
export default class MarketComponent extends React.Component<Props, {}> {
    render() { 
        return (
            <div>
                <ABSPanel title="市场概要">
                    <ABSTableMarket>
                        <div>市场-table</div>
                    </ABSTableMarket>
                </ABSPanel>
                <ABSPanel title="发行统计">
                    <ABSChartMarket>
                        <div>市场-图表</div>
                    </ABSChartMarket>
                </ABSPanel>
            </div>
        );
    }
}
