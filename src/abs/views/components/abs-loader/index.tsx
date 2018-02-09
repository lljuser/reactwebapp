import * as React from 'react';
import ContentLoader, { Facebook } from 'react-content-loader';
import './index.less';
import ABSPanelComponent from '../abs-panel/index'; 
import Loader from  '../../../../components/react-loader-spinner';

export class ABSContentLoader extends React.Component<any, {}> {

    constructor(props: any) {
        super(props);
    }
    render() {
        // const y = 70;
        return (           
            <div 
                style={{
                width: '40px',
                margin: '20px auto', 
                }}
            >
                <Loader type="ThreeDots" color="gray" height="40" width="40" />
            </div>          
        );
    }
} 

// 动画-内容型
export class ABSPageLoader extends React.Component<any, {}> {

    constructor(props: any) {
        super(props);
    }
    render() {
        // const y = 70;
        return (
            <ABSPanelComponent>
                <Facebook   speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <Facebook   speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <Facebook   speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <Facebook   speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <Facebook   speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <Facebook   speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />   
            </ABSPanelComponent> 
        );
    }
} 

export class ABSListLoader extends React.Component<any, {}> { 
    constructor(props: any) {
        super(props);
    }
    render() {
        // const y = 70;
        return (
            <ABSPanelComponent>
                {/* <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />   */} 
             
                 <ContentLoader
                    height={350}
                    width={400}
                    speed={2}
                    primaryColor={'#535353'}
                    secondaryColor={'gray'}
                 > 
                    <circle cx="22" cy="173" r="8" /> 
                    <rect x="33" y="168" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="21" cy="219" r="8" /> 
                    <rect x="33" y="214" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="22" cy="262" r="8" /> 
                    <rect x="33" y="257" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="23" cy="310" r="8" /> 
                    <rect x="34" y="305" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="24.68586043877483" cy="35.69586043877483" r="20.42586043877483" /> 
                    <rect x="67" y="25.27" rx="10" ry="8" width="280" height="24" /> 
                    <rect x="69" y="90" rx="5" ry="5" width="60" height="12" /> 
                    <rect x="140" y="90" rx="5" ry="5" width="60" height="12" /> 
                    <rect x="210" y="90" rx="5" ry="5" width="60" height="11" /> 
                    <rect x="282" y="90" rx="5" ry="5" width="60" height="12" />
                 </ContentLoader>
                 <ContentLoader
                    height={350}
                    width={400}
                    speed={2}
                    primaryColor={'#535353'}
                    secondaryColor={'gray'}
                 > 
                    <circle cx="22" cy="173" r="8" /> 
                    <rect x="33" y="168" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="21" cy="219" r="8" /> 
                    <rect x="33" y="214" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="22" cy="262" r="8" /> 
                    <rect x="33" y="257" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="23" cy="310" r="8" /> 
                    <rect x="34" y="305" rx="5" ry="5" width="360" height="10" /> 
                    <circle cx="24.68586043877483" cy="35.69586043877483" r="20.42586043877483" /> 
                    <rect x="67" y="25.27" rx="10" ry="8" width="280" height="24" /> 
                    <rect x="69" y="90" rx="5" ry="5" width="60" height="12" /> 
                    <rect x="140" y="90" rx="5" ry="5" width="60" height="12" /> 
                    <rect x="210" y="90" rx="5" ry="5" width="60" height="11" /> 
                    <rect x="282" y="90" rx="5" ry="5" width="60" height="12" />
                 </ContentLoader>
            </ABSPanelComponent> 
        );
    }
}  
