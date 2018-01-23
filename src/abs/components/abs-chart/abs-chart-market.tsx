import * as React from 'react';
// import { Link } from 'react-router-dom';
import './abs-chart.less';
import 'amfe-flexible';

interface Props {
    title?: string;
}

export default class ABSChartMarketComponent extends React.Component<Props, {}> {
    render() {
        return (
            <div className="abs-chart">这里是市场图表</div>
        );
    }

}