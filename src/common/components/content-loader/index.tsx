import * as React from 'react';
import { Flex, WhiteSpace  } from 'antd-mobile'; 
import ContentLoader  from 'react-content-loader';  

export default class ContentLoader extends React.Component<any, any> {
    render() {
        return (
            <React.Fragment>
                <Flex>
                    <Flex.Item>
                        <ContentLoader
                            height={475}
                            width={400}
                            speed={2}
                        >
                            <circle cx="30" cy="30" r="30" />
                            <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
                            <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
                            <rect x="0" y="70" rx="5" ry="5" width="400" height="400" />
                        </ContentLoader>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item>
                        <div>页面预加载</div>
                    </Flex.Item>
                </Flex>
            </React.Fragment>    
        );
    }
}