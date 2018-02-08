import * as React from 'react';
import Loader  from '../react-loader-spinner';
import { Flex, WhiteSpace } from 'antd-mobile';  
 
export default class SpinnerLoader extends React.Component<any, any> {
    render() {
        return (  
            <React.Fragment>
                <span style={{color: '#fff'}}>尺寸：40px</span>
                <Flex>
                    <Flex.Item>
                        <Loader type="Audio" color="#FFC446" height={40} width={40}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Ball-Triangle" color="#FFC446" height={40} width={40}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Bars" color="#FFC446" height={40} width={40}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Circles" color="#FFC446" height={40} width={40}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Grid" color="#FFC446" height={40} width={40} />
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="TailSpin" color="#FFC446" height={40} width={40} />
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="xl" />
                <Flex>
                    <Flex.Item>
                        <Loader type="TailSpin" color="#FFC446" height={40} width={40} />
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Hearts" color="#FFC446" height={40} width={40} />
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Oval" color="#FFC446" height={40} width={40}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Puff" color="#FFC446" height={40} width={40}/>
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="Rings" color="#FFC446" height={40} width={40} />
                    </Flex.Item>
                    <Flex.Item>
                        <Loader type="ThreeDots" color="#FFC446" height={40} width={40} />
                    </Flex.Item>
                </Flex>
            </React.Fragment> 
        );
    }
}