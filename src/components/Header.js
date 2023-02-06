import React, { Component } from 'react';
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
      </header>
    );
  }
}
export default Header;
