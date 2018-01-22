import * as React from 'react';
import { Switch, Route , Redirect } from 'react-router-dom';  
import Home from './Home';
import Market from './Market';
import Product from './Product';
import Trade from './Trade'; 
import ProductDetail from './ProductDetail'; 

interface AppProp {
  name?: string;
  version?: string;
}

export default class App extends React.Component<AppProp, {}> {
   render() {
    return (
      <Switch>
          <Route exact={true} path="/" component={Home}/>  
          <Route exact={true} path="/productDetail/:id" component={ProductDetail}/> 
          <Redirect path="*" to="/" />
      </Switch>
    );
   }
}
