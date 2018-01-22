import * as React from 'react';
import { NavBar, Icon } from 'antd-mobile'; 
import { Link } from 'react-router-dom';

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
                <NavBar 
                    mode="light"
                    icon={<Link to="/product"><Icon type="left" /></Link>} 
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >
                    NavBar
                </NavBar> 
        </div>
        );
    }
} 