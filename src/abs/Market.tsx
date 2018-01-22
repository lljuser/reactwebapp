import * as React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import '../../public/css/theme.css';
import 'amfe-flexible';

interface Props {
    title: string;
  }
  
export default class MyComponent extends React.Component<Props, {}> {
    render() { 
        return (
            <Router>
                <div className="appH5_body">
                    <div id="root" className="appH5_content"> 
                        <div className="appH5_panel  appH5_panel_mb" >
                            <div className="appH5_title"><span>市场概要</span></div>
                            <div>
                                <table className="appH5_table">
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="appH5_panel">
                            <div className="appH5_title"><span>发行统计</span></div>
                            <div>highcharts</div>
                        </div> 
                    </div>
                    <Route path="/productDetail/:id" component={ProductDetail}/> 
                </div> 
            </Router> 
        );
    }
}
