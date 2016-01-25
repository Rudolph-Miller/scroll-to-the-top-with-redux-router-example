import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { IndexRoute, Route, Redirect, Link } from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';

const Styles = {
  linkContainer: {
    marginTop: '1000px'
  }
}

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class Hoge extends Component {
  render() {
    return (
      <div>
        <div>Hoge</div>
        <div style={Styles.linkContainer}>
          <Link to="/fuga">
            To Fuga
          </Link>
        </div>
      </div>
    );
  }
}

class Fuga extends Component {
  render() {
    return (
      <div>
        <div>Fuga</div>
        <div style={Styles.linkContainer}>
          <Link to="/hoge">
            To Hoge
          </Link>
        </div>
      </div>
    );
  }
}

const routes = (
  <Route>
    <Redirect path="/" to="hoge" />
    <Route path="/" component={App}>
      <Route path="hoge" component={Hoge} />
      <Route path="fuga" component={Fuga} />
    </Route>
  </Route>
);

const reducer = combineReducers({
  router: routerStateReducer
});

const store = reduxReactRouter({routes, createHistory})(createStore)(reducer);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    );
  }
}

render(<Root />, document.getElementById('app'));
