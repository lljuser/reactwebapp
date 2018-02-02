import * as React from 'react';
import ContentLoader from 'react-content-loader';
import 'amfe-flexible';

interface Props {
    title?: string;
    data?: any;
    minHeight?: string;
    className?: string;
}
// 动画-内容型
export class ProductDetailLoader extends React.Component<Props, {}> {

    constructor(props: any) {
        super(props);
    }
    render() {
        // const y = 70;
        return (
            <div className="abs-loader abs-loader-content" style={{width: '400px', margin: '20px auto'}}>
                <ContentLoader
                    height={300}
                    width={400}
                    speed={2}
                    primaryColor={'#535353'}
                    secondaryColor={'gray'}
                >
                    <rect x="20" y="0" rx="2" ry="2" width="100" height="30" />
                    <rect x="140" y="0" rx="2" ry="2" width="100" height="30" />
                    <rect x="260" y="0" rx="2" ry="2" width="100" height="30" />
                    <rect x="20" y="40" rx="2" ry="2" width="100" height="20" />
                    <rect x="140" y="40" rx="2" ry="2" width="100" height="20" />
                    <rect x="260" y="40" rx="2" ry="2" width="100" height="20" />
                    <rect x="20" y="70" rx="2" ry="2" width="340" height="20" />
                    <rect x="20" y="100" rx="2" ry="2" width="340" height="20" />
                    <rect x="20" y="130" rx="2" ry="2" width="340" height="20" />
                    <rect x="20" y="160" rx="2" ry="2" width="340" height="20" />
                    <rect x="20" y="190" rx="2" ry="2" width="340" height="20" />
                    <rect x="20" y="220" rx="2" ry="2" width="340" height="20" />
                    <rect x="20" y="250" rx="2" ry="2" width="340" height="20" />
                </ContentLoader>
            </div>
        );
    }
} 
