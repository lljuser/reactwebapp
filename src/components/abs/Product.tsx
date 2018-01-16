import * as React from 'react';
import { Button } from 'antd-mobile';

interface Props {
    title: string;
  }
  
export default class MyComponent extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <span>Project:{this.props.title}</span>
                <Button type="primary">产品</Button>
            </div> 
        );
    }
}