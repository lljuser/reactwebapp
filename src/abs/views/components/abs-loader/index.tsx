import * as React from 'react';
import { Facebook, BulletList } from 'react-content-loader';
import './index.less';
import 'amfe-flexible';
import ABSPanelComponent from '../abs-panel/index'; 
 
// 动画-内容型
export class AbsContentLoader extends React.Component<any, {}> {

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

export class AbsListLoader extends React.Component<any, {}> { 
    constructor(props: any) {
        super(props);
    }
    render() {
        // const y = 70;
        return (
            <ABSPanelComponent>
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />
                <BulletList    speed={2} primaryColor={'#535353'}  secondaryColor={'gray'} />  
            </ABSPanelComponent> 
        );
    }
}  
