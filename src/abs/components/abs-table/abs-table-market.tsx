import * as React from 'react';
import { Link } from 'react-router-dom';
// import ABSBaseTable from './abs-table';
import './abs-table.less';
import 'amfe-flexible'; 

interface Props {
    title?: string;
}

export default class ABSTableMarketComponent extends React.Component < Props, {} > {
    render() {
        return (
            <div className="abs-table abs-table-market">
                <table title="{this.props.title}">
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
                        <tr>
                            <td><Link to="/productDetail/10">企业ABN</Link></td>
                            <td>10</td>
                            <td>110</td>
                            <td>110</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}