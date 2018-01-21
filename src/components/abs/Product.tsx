import * as React from 'react';
import Post from '../../http/request/post';
import Get from '../../http/request/get';
 
interface Props {
    title: string;
}
  
export default class MyComponent extends React.Component<Props, {}> {

  componentDidMount() {
    Get('http://localhost:64811/api/person', {}, (data) => {
      console.log(data);
    });

    Post('http://localhost:64811/api/person', {}, (data) => {
      console.log(data);
    });
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