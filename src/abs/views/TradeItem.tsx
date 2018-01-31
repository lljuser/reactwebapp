import * as React from 'react';
import { Link } from 'dva/router';  
// import { Button } from 'antd-mobile';
import RoutePageList from '../RouterConfig';

/**
 * props接口
 * 
 * @interface AppProps
 */
interface AppProps {
    SecurityName: string;
    TotalOffering: string;
    AssetType: string;
    TradeTypeId: number;
    TradeId: number;
    SecurityId: number;
}

/**
 * 创造默认组件
 * 
 * @export
 * @class MyComponent
 * @extends {React.Component<AppProps, {}>}
 */
export default class MyComponent extends React.Component<AppProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    <div className={this.props.TradeTypeId === 1 ? 'tradingMarketDiv appH5_bg_blue' : 'tradingMarketDiv appH5_bg_purple'}>{this.props.TradeTypeId === 1 ? 'P' : 'S'}</div>
                </td>
                <td className={'text-left'}>
                    <Link to={`${RoutePageList.TradeDetailPage}${this.props.TradeId}/${this.props.SecurityId}`} className="appH5_color_link">
                        <div className={'td_elips1'}>{this.props.SecurityName}</div>
                    </Link>
                </td>
                <td className={'text-right highLight-red'} style={{ fontSize: '17px' }}>
                    <div>{this.props.TotalOffering}</div>
                </td>
                <td style={{ color: 'white' }} className={'text-right td_elips2'}>
                    <div style={{ width: '100%', float: 'right' }}>{this.props.AssetType}</div>
                </td>
            </tr>
        );
    }
}