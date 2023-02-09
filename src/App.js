import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            path="/search"
            component={ Search }
          />
          <Route
            path="/album/:id"
            component={ Album }
          />
          <Route
            path="/favorites"
            render={ () => (
              <div data-testid="page-favorites">
                <Header />
              </div>
            ) }
          />
          <Route
            exact
            path="/profile"
            render={ () => (
              <div data-testid="page-profile">
                <Header />
              </div>
            ) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <div data-testid="page-profile-edit">
                <Header />
              </div>
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
