import * as React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/fontawesome-free-solid';

// 如果不是使用 List.Item 作为 children
interface Props {
    onClick?: any;
    extra?: any;
    first?: string;
}

export default class PickerChildren extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.onClick} className={this.props.first ? 'picker-trigger first' : 'picker-trigger'}>
                <div className="selector">{this.props.extra}
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>
        );
    }
}  
