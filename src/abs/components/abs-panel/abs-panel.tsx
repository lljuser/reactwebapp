import * as React from 'react';
// import { Link } from 'react-router-dom';
import './abs-panel.less';
import 'amfe-flexible';

interface Props {
    title: string;
    data?: any;
}

export default class ABSPanelComponent extends React.Component<Props, {}> {
    render() {
        return (
            <div className="abs-panel-body" style={this.props.title === '发行统计' ? { paddingTop: '12px' } : {}}>
                <div className="abs-panel-content">
                    <div className="abs-panel-panel  abs-panel-panel_mb" >
                        <div className="abs-panel-title"><span>{this.props.title}</span></div>
                        <div className="abs-panel-container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
