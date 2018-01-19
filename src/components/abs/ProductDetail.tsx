import * as React from 'react';
import { Button } from 'antd-mobile'; 
 
interface Props {
    title: string;
}
  
export default class MyComponent extends React.Component<Props, {}> {
    render() {  
        return (
            <div> 
                <Button type="primary">产品详情</Button>
            </div> 
        );
    }
} 