import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import Complex from './Complex';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route  path="/complex" component={Complex} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();
