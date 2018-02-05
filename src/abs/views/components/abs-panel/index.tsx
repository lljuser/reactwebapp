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

    constructor(props: any) {
        super(props);
    } 

    render() {
      const className = 'abs-panel ' + (this.props.className || '');
      if (this.props.title) {
        return (
            <div className={className}>
                {/* <WingBlank size="sm"> */}
                    <div className="abs-panel-title">{this.props.title}</div>
                    <div className="abs-panel-content">{this.props.children}</div>
                {/* </WingBlank> */}
            </div>
        );
      }

      return (
        <div className={className}>
            {/* <WingBlank size="sm"> */}
                <div className="abs-panel-content">{this.props.children}</div>
            {/* </WingBlank> */}
        </div>
    );
    }

}  