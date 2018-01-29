import * as React from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import './index.less';
import 'amfe-flexible';

interface Props {
    title: string;
    data?: any; 
    minHeight?: string;
}  

export default class ABSPanelComponent extends React.Component<Props, {}> {
    panelStyles = {
        minHeight: '200px',
    };

    constructor(props: any) {
        super(props);
        if (this.props.minHeight) {
            this.panelStyles.minHeight = this.props.minHeight;
        }
    } 

    render() {
        return (
            <div className="abs-panel" style={this.panelStyles}>
                <WhiteSpace size="lg"/>
                <WingBlank size="sm">
                    <div className="abs-panel-title">{this.props.title}</div>
                    <div className="abs-panel-content">{this.props.children}</div>
                </WingBlank>
            </div>
        );
    }

}  
