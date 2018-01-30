import * as React from 'react';
// import { WingBlank } from 'antd-mobile';
import './index.less';
import 'amfe-flexible';

interface Props {
    title?: string;
    data?: any; 
    minHeight?: string;
    className?: string;
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
      if (this.props.title) {
        return (
            <div className={'abs-panel ' + this.props.className || ''} style={this.panelStyles}>
                {/* <WingBlank size="sm"> */}
                    <div className="abs-panel-title">{this.props.title}</div>
                    <div className="abs-panel-content">{this.props.children}</div>
                {/* </WingBlank> */}
            </div>
        );
      }

      return (
        <div className={'abs-panel ' + this.props.className || ''} style={this.panelStyles}>
            {/* <WingBlank size="sm"> */}
                <div className="abs-panel-content">{this.props.children}</div>
            {/* </WingBlank> */}
        </div>
    );
    }

}  
