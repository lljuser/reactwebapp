import * as React from 'react';
import { Switch, Route , Redirect } from 'react-router-dom';  
import Home from './Home';
import ProductDetail from './ProductDetail'; 

interface AppProp {
  name?: string;
  version?: string;
}

export default class App extends React.Component<AppProp, {}> {
   render() {
    return (
      <Switch>
          <Route exact={true} path="/:tab(market|trade|product)" render={() => <Home tab={'1'}/>}/>  
          <Route exact={true} path="/productDetail/:id" component={ProductDetail}/> 
          <Redirect path="*" to="/market" />
      </Switch>
    );
   }
}
