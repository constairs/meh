import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { LoginContainer } from './containers/LoginContainer/';
import { ChannelsConstainer } from './containers/ChannelsContainer';
import { Banner } from './components/Banner';
import { ProfilePage } from './components/ProfilePage';
import { history } from './redux/store';
import { Header } from './containers/Header';

const Private = ({ component: Component, logged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (logged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

Private.defaultProps = {
  logged: false,
};

Private.propTypes = {
  component: PropTypes.func.isRequired,
  logged: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const PrivateRoute = connect(state => ({ logged: state.persistedUser.logged, }))(Private);

export const Navigation = () => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Banner} />
        <Route exact path="/login/" component={LoginContainer} />
        <PrivateRoute component={ChannelsConstainer} path="/channels/" />
        <PrivateRoute component={ProfilePage} path="/profile/" />
      </Switch>
    </React.Fragment>
  </ConnectedRouter>
);
