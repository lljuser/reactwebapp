import * as React from 'react';
import { NavBar, Icon } from 'antd-mobile'; 
 
interface Props {
    title: string;
}
  
export default class MyComponent extends React.Component<Props, {}> {
    render() {  
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
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