import * as React from 'react';
import './index.css';

interface SpinnerProps {
  error: any;
  pastDelay: number;
}

export default class Spinner extends React.Component<SpinnerProps> {
  constructor(props: SpinnerProps) {
    super(props);
    console.log(props);
  }

  render () {
    if (this.props.pastDelay) {
      return (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      );
    } else {
      return null;
    }
  }
}
