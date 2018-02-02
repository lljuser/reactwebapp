import * as React from 'react'; 
import { Flex, WhiteSpace } from 'antd-mobile';  
import Spinner from 'react-spinkit'; 
 
export default class SpinnerLoader extends React.Component<any, any> {
    render() {
        return (  
            <React.Fragment>
                <Flex>
                    <Flex.Item> 
                        <Spinner  name="cube-grid" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="three-bounce" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="ball-clip-rotate-pulse" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="ball-clip-rotate" color="#FFC446"/>
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="lg" /> 
                <Flex>
                    <Flex.Item> 
                        <Spinner name="ball-scale-ripple" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="ball-beat" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="ball-scale-multiple" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="line-scale-pulse-out-rapid" color="#FFC446"/>
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="lg" /> 
                <Flex>
                    <Flex.Item> 
                        <Spinner name="ball-triangle-path" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="ball-scale-ripple-multiple" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="ball-spin-fade-loader" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="pulse" color="#FFC446"/>
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="lg" /> 
                <Flex>
                    <Flex.Item> 
                        <Spinner name="ball-triangle-path" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="folding-cube" color="#FFC446"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="double-bounce" color="#FFC446"/> 
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner name="ball-grid-beat" color="#FFC446"/>
                    </Flex.Item>
                </Flex>  
            </React.Fragment> 
        );
    }
}