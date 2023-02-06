import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    const { name } = user;
    this.setState({
      name,
      isLoading: false,
    });
  }

  render() {
    const { name, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">{name}</h3>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}
export default Header;
