import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isButtonDisabled: true,
    isLoading: false,
    saved: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, this.enableSaveButton);
  };

  enableSaveButton = () => {
    const {
      name,
    } = this.state;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  criarUsuario = async () => {
    const { name } = this.state;
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        await createUser({ name });
        this.setState({
          isLoading: false,
          saved: true,
        });
      },
    );
  };

  render() {
    const { name, isButtonDisabled, isLoading, saved } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.criarUsuario }
          >
            Entrar
          </button>
          <span>
            {saved ? <Redirect to="/search" /> : undefined }
          </span>
        </form>
      </div>
    );
  }
}

export default Login;
