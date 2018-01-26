import * as React from 'react';
// import { Link } from 'react-router-dom';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import './abs-panel.less';
import 'amfe-flexible';

interface Props {
    title: string;
    data?: any;
}

export default class ABSPanelComponent extends React.Component<Props, {}> {
    render() {
        return (
            <div className="abs-panel">
                <WhiteSpace size="lg"/>
                <WingBlank size="sm">
                    <div className="abs-panel-title">{this.props.title}</div>
                    <div className="abs-panel-content">{this.props.children}</div>
                </WingBlank>
            </div>
        );
    }

}
