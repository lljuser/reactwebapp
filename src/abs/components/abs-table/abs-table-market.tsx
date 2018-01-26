import * as React from 'react';
// import { Link } from 'react-router-dom';
import Request from '../../../components/http/request/index';
import { ListView } from 'antd-mobile';
import './abs-table.less';
import 'amfe-flexible';

interface Parameter {
    dataSource: any;
    height: number;
    marketSummary: any;
    isMarketLoading: boolean;
    isFetchMarketError: boolean;
    isLoadTop: boolean;
}
export default class ABSTableMarketComponent extends React.Component<{}, Parameter> {
    constructor(props: object) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource,
            height: document.documentElement.clientHeight,
            marketSummary: [],
            isMarketLoading: false,
            isFetchMarketError: false,
            isLoadTop: false
        };
    }

    componentDidMount() {
        this.fetchMarketSummary();
    }

    fetchMarketSummary() {
        const marketListUrl = 'http://10.1.1.35/momarket/productsummary';
        Request.post(marketListUrl, {}, (data) => {
            this.setState({ marketSummary: data });
            console.log(data);
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <table className="abs-table abs-table-market" title="{this.props.title}">
                <thead>
                    <tr>
                        <th>分类</th>
                        <th className="text-right">今年(单)</th>
                        <th className="text-right">今年(亿)</th>
                        <th className="text-right">累计(亿)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.marketSummary.map((item) =>
                            <tr key={item.ProductTypeId}>
                                <td><a href="javascript:"> {item.SimpleProductType}</a></td>
                                <td className="text-right">{item.DealCountCurrentYear}</td>
                                <td className="text-right appH5_color_red">{item.BalanceCurrentYear}</td>
                                <td className="text-right">{item.BalanceCumulative}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }
}
