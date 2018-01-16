import * as React from 'react';
import { BrowserRouter as Router,  Route,  Link } from 'react-router-dom'; 
import { Button } from 'antd-mobile';

const Home = () => (
  <div>
    <h2>Home</h2>
    <Button type="primary">AntdMobile-Home</Button>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2> 
    <Button type="primary">AntdMobile-About</Button>
  </div>
);   
 
interface RouteMatch {
  url: string; 
  params: {topicId: string};
} 

const Topic = (prop: {match: RouteMatch} ) => (
  <div>
    <h3>{prop.match.params.topicId}</h3>
  </div>
); 

const Topics = ( prop: {match: RouteMatch} ) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${prop.match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${prop.match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${prop.match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${prop.match.url}/:topicId`} component={Topic}/>
    <Route exact={true} path={prop.match.url} render={() => (<h3>Please select a topic.</h3>)}/>
  </div>
); 

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul> 
      <hr/> 
      <Route exact={true} path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
); 

export default BasicExample;