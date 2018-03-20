import * as React from 'react';
import { Link } from 'dva/router';
// import { Button } from 'antd-mobile';
import RoutePageList from '../../RouterConfig';

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
                <td className={'text-left'} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div className={this.props.TradeTypeId === 1 ? 'abs_icon_square_char abs_bg_blue' : 'abs_icon_square_char abs_bg_purple'}>{this.props.TradeTypeId === 1 ? 'P' : 'S'}</div>
                </td>
                <td className={'text-left'}>
                    <Link to={`${RoutePageList.TradeDetailPage}/${this.props.TradeId}/${this.props.SecurityId}`} className="appH5_color_link">
                        <div className={'abs_ellipsis'} style={{ width: '108%' }}>{this.props.SecurityName}</div>
                    </Link>
                </td>
                <td className={'text-right highLight-red'} style={{ fontSize: '17px'}}>
                    <div>{this.props.TotalOffering}</div>
                </td>
                <td style={{ color: 'white' }} className={'text-right td_elips2'}>
                    <div className={'abs_ellipsis'}>{this.props.AssetType}</div>
                </td>
            </tr>
        );
    }
}