import * as React from 'react';
// import { NavBar, Icon } from 'antd-mobile'; 
// import { Link } from 'dva/router';
import { ABSNavBar } from '../components/abs-back';

interface Props {
    title: string;
}
  
export default class MyComponent extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = {
          lastPath: props.title,
        }; 
    } 

    render() {  
        return (
            <div>
                <ABSNavBar 
                    title="导航"
                    path="/product"
                /> 
        </div>
        );
    }
} 