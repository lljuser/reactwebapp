import * as React from 'react';
import './index.less'; 

export default class ABSContainer extends React.Component<any, {}> { 
    constructor(props: any) {
        super(props);
    } 

    render() { 
        return (
            <div className="abs-container">
               {this.props.children}
            </div>
        );
    }

}  
