import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './WaitingScreen/App';
import Game from './PageGame/Game';
import Invite from './Invite/Invite';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch >
      <Route exact path="/" component={App} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/invite:id" component={Invite} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
