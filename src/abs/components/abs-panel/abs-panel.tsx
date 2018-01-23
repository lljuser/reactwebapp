import * as React from 'react';
import { Link } from 'react-router-dom';
import './abs-panel.less';
import 'amfe-flexible';

interface Props {
    title: string;
}

export default class ABSPanelComponent extends React.Component<Props, {}> { 
    render() {
        return (
            <div className="abs-panel-body">
                <div className="abs-panel-content">
                    <div className="abs-panel-panel  abs-panel-panel_mb" >
                        <div className="abs-panel-title"><span>{this.props.title}</span></div>
                        <div className="abs-panel-container">
                            <table className="abs-panel-table">
                                <thead>
                                    <tr>
                                        <th>分类</th>
                                        <th className="text-right">今年(单)</th>
                                        <th className="text-right">今年(亿)</th>
                                        <th className="text-right">累计(亿)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Link to="/productDetail/10">企业ABN</Link></td>
                                        <td>10</td>
                                        <td>110</td>
                                        <td>110</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/productDetail/10">企业ABN</Link></td>
                                        <td>10</td>
                                        <td>110</td>
                                        <td>110</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/productDetail/10">企业ABN</Link></td>
                                        <td>10</td>
                                        <td>110</td>
                                        <td>110</td>
                                    </tr>
                                    <tr>
                                        <td><Link to="/productDetail/10">企业ABN</Link></td>
                                        <td>10</td>
                                        <td>110</td>
                                        <td>110</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="abs-panel-panel">
                        <div className="abs-panel-title"><span>发行统计</span></div>
                        <div>highcharts</div>
                    </div>
                </div>
            </div>
        );
    }

}
 