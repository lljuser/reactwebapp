import * as React from 'react';
import { Link } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import './index.less';
interface Props {
    path: string;
    title?: string;
}

export class ABSNavBar extends React.Component<Props, any> {
    render() {
        return (
            <NavBar
                icon={<Link to="/{this.props.path}"><Icon type="left" /></Link>} 
                rightContent={[ 
                    <Icon key="1" type="ellipsis" />,
                ]}
            >
                {this.props.title}
            </NavBar> 
        );
    }
}   
