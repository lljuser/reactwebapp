import * as React from 'react';
import { Link } from 'react-router-dom';
import './abs-panel/abs-panel.less';
import 'amfe-flexible';
import ABSPanelComponent from './abs-panel/abs-panel';

interface Props {
    title: string;
}
  
export default class MarketComponent extends React.Component<Props, {}> {
    render() { 
        return (
            <abs-panel title='sss'></abs-panel>
        );
    }
}
