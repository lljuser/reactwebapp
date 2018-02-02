import * as React from 'react'; 
import { Flex, WhiteSpace } from 'antd-mobile';  
import Spinner from 'react-spinkit'; 
 
export default class SpinnerLoader extends React.Component<any, any> {
    render() {
        return (  
            <React.Fragment>
                <Flex>
                    <Flex.Item> 
                        <Spinner  name="cube-grid" color="coral"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="three-bounce" color="purple"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="ball-clip-rotate-pulse" color="olive"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="ball-clip-rotate" color="blue"/>
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="lg" /> 
                <Flex>
                    <Flex.Item> 
                        <Spinner  name="ball-scale-ripple" color="olive"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="ball-beat" color="aqua"/>
                    </Flex.Item>
                    <Flex.Item>
                       <Spinner  name="ball-scale-multiple" color="fuchsia"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="line-scale-pulse-out-rapid" color="blue"/>
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="lg" /> 
                <Flex>
                    <Flex.Item> 
                        <Spinner  name="ball-triangle-path" color="aqua"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="ball-scale-ripple-multiple" color="steelblue"/>
                    </Flex.Item>
                    <Flex.Item>
                         <Spinner  name="ball-spin-fade-loader" color="aqua"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="pulse" color="steelblue"/>
                    </Flex.Item>
                </Flex> 
                <WhiteSpace size="lg" /> 
                <Flex>
                    <Flex.Item> 
                        <Spinner  name="ball-triangle-path" color="aqua"/>
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="folding-cube" color="red"/>
                    </Flex.Item>
                    <Flex.Item>
                         <Spinner  name="double-bounce" color="goldenrod"/> 
                    </Flex.Item>
                    <Flex.Item>
                        <Spinner  name="ball-grid-beat" color="blue"/>
                    </Flex.Item>
                </Flex>  
            </React.Fragment> 
        );
    }
}