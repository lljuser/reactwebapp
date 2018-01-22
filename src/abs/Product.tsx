import * as React from 'react';
import Request from '../components/http/request';
 
interface Props {
    title: string;
}
  
export default class MyComponent extends React.Component<Props, {}> {

  componentDidMount() {
    Request.post('http://localhost:64811/api/person', {}, (data) => {
      console.log(data);
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() { 
    console.log('Product render');
    return (
        <div>
            <span>Product:{this.props.title}</span>
        </div> 
    );
  }
} 