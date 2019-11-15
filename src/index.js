import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import TodoList from './page/TodoList';
import studentDetail from './page/studentDetail';

import { Provider } from 'react-redux';
import store from './store';

const App = (
  <Provider store={store}>
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route path="/student/:id" component={studentDetail} />
          {/* <Route path="/student" component={Student} /> */}
        </Switch>
      </>
    </Router>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
