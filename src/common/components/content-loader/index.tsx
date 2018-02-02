import * as React from 'react';
import { Flex, WhiteSpace  } from 'antd-mobile'; 
import { Facebook } from 'react-content-loader';  

export default class ContentLoader extends React.Component<any, any> {
    render() {
        return ( 
            <React.Fragment>
                <Flex>
                    <Flex.Item>
                        <Facebook />
                    </Flex.Item> 
                 </Flex>  
                 <WhiteSpace size="lg" />
            </React.Fragment>    
        );
    }
}