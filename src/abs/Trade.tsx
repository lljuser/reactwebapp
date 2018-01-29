import * as React from 'react';
import { Link } from 'dva/router';
// import { Button } from 'antd-mobile';

interface Props {
    title: string;
}

export default class MyComponent extends React.Component<Props, {}> {
    render() {
        console.log('Trade render');
        return (
            <div>
                <span>Trade:{this.props.title}</span>
                <Link to={`/TradeDetail/86/6714`}><div style={{ color: 'red', marginTop: '30px' }}>交易详情页链接</div></Link>
            </div>
        );
    }
} 
