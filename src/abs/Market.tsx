import * as React from 'react';
// import { Link } from 'react-router-dom';
import 'amfe-flexible';
import ABSPanel from './components/abs-panel/abs-panel';

interface Props {
    title: string;
}
  
export default class MarketComponent extends React.Component<Props, {}> {
    // constructor(props: Props) {
    //     super(props);
    //     this.timerID = updateTimer;
    // }
    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(),
    //         1000
    //       );
    // }

    // updateTimer() {
    //     setInterval(
    //         () => this.tick(),
    //         1000
    //       );
    // }

    render() { 
        return (
             <ABSPanel title="市场概要">
                 <div>ABC</div>
             </ABSPanel>
        );
    }
}
