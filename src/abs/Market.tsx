import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import ABSPanel from './components/abs-panel/abs-panel';

interface Props {
    title: string;
}
  
export default class MarketComponent extends React.Component<Props, {}> {
    render() { 
        return (
             <ABSPanel >
                 <div>ABC</div>
             </ABSPanel>
        );
    }
}
