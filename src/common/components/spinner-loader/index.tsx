import * as React from 'react';
import Loader  from 'react-loader-spinner';
import { Flex, WhiteSpace } from 'antd-mobile';  
 
export default class SpinnerLoader extends React.Component<any, any> {
    render() {
        return (  
            <React.Fragment>
                <Flex>
                    <Flex.Item>
                        <Loader type="Audio" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Ball-Triangle" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Bars" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item>
                        <Loader type="Grid" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Hearts" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Oval" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Puff" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                </Flex> 
                <Flex>
                    <Flex.Item>
                        <Loader type="Rings" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="TailSpin" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80}/>
                    </Flex.Item> 
                </Flex> 
            </React.Fragment> 
        );
    }
}