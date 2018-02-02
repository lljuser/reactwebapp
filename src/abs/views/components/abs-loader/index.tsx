import * as React from 'react';
import ContentLoader, { Facebook } from 'react-content-loader';
import SpinnerLoader from 'react-loader-spinner';
import './index.less';
import 'amfe-flexible';

interface Props {
    title?: string;
    data?: any;
    minHeight?: string;
    className?: string;
}
// 动画-圆圈型
export class ABSSpinnerLoader extends React.Component<Props, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="abs-loader abs-loader-spinner"> 
                <SpinnerLoader type="Oval" color="#00BFFF" height={80} width={80} /> 
            </div>
        );
    }
}
// 动画-内容型
export class ABSContentLoader extends React.Component<Props, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="abs-loader abs-loader-content">
                <Facebook speed={2} primaryColor="#535353" secondaryColor="gray" />
                <Facebook speed={2} primaryColor="#535353" secondaryColor="gray" />
                <Facebook speed={2} primaryColor="#535353" secondaryColor="gray" />
                <Facebook speed={2} primaryColor="#535353" secondaryColor="gray" />
                <ContentLoader speed={2} primaryColor="#535353" secondaryColor="gray">
                    {/* Pure SVG */}
                    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                </ContentLoader>
            </div>
        );
    }
} 
