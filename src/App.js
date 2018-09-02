import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Groups from './components/group/Groups';
import AddGroup from './components/group/AddGroup';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as routes from './constants/routes';

const App = () =>
  <Router>
    <div>
      <Header branding="no-mad"/>
      <Route exact path={routes.GROUPS} component={Groups}/>
      <Route exact path={routes.ADD_GROUP} component={AddGroup}/>
    </div>
  </Router>

export default App;
