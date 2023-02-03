import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <div
                data-testid="page-login"
              >
                <Login />
              </div>
            ) }
          />
          <Route
            path="/search"
            render={ () => (
              <div data-testid="page-search" />
            ) }
          />
          <Route
            path="/album/:id"
            render={ () => (
              <div data-testid="page-album" />
            ) }
          />
          <Route
            path="/favorites"
            render={ () => (
              <div data-testid="page-favorites" />
            ) }
          />
          <Route
            exact
            path="/profile"
            render={ () => (
              <div data-testid="page-profile" />
            ) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <div data-testid="page-profile-edit" />
            ) }
          />
          <Route
            render={ () => (
              <div data-testid="page-not-found" />
            ) }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
