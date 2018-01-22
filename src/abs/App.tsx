import * as React from 'react';
import { HashRouter as Router,  Route , Link } from 'react-router-dom';  
import Market from './Market';
import Product from './Product';
import Trade from './Trade'; 
import ProductDetail from './ProductDetail';
import '../public/css/theme.css';

// const tabs = [
//   { title: '市场 ', name: 'market' },
//   { title: '产品', name: 'product' },
//   { title: '交易', name: 'trade' },
// ];

interface AppProp {
  name?: string;
  version?: string;
}

class App extends React.Component<AppProp, {}> {
   render() {
    return (
      <Router>
        <div id="app" className="cnabs-bg">
          <div v-if="!showHeader" className="appH5_navbar_bg">
            <div className="appH5_navbar" >
              <Link to="/market" className="appH5_tab">市场</Link>
              <Link to="/product"   className="appH5_tab">产品</Link>
              <Link to="/trade" className="appH5_tab">交易</Link>
            </div>
          </div>    
          <Route exact={true} path="/market" component={Market}/> 
          <Route path="/product" component={Product}/> 
          <Route path="/trade" component={Trade}/> 
          <Route path="/productDetail/:id" component={ProductDetail}/> 
        </div>
      </Router>
    );
  }
} 
 
export default App;  