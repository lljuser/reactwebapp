import * as React from 'react';
import { Button } from 'antd-mobile'; 
 
interface Props {
    title: string;
  }
  
export default class MyComponent extends React.Component<Props, {}> {
    render() {
      console.log('Market render');
      return (
        <div>
            <span>Market:{this.props.title}</span>
            <Button type="primary">市场</Button>
        </div> 
    );
    }
}
