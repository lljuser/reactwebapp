import * as React from 'react';
// import { Button } from 'antd-mobile';
 
interface Props {
    title: string;
}
  
export default class TradeComponent extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);  
    }

    render() {  
        return (
            <div>
                <span>Trade:{this.props.title}</span>
            </div> 
        );
    }
} 
