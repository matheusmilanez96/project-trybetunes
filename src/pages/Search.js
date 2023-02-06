import React, { Component } from 'react';

class Search extends Component {
  state = {
    artistName: '',
    isButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ artistName: value }, this.enableSearchButton);
  };

  enableSearchButton = () => {
    const {
      artistName,
    } = this.state;
    const minLength = 2;
    if (artistName.length >= minLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  render() {
    const { isButtonDisabled, artistName } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
          value={ artistName }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isButtonDisabled }
        >
          Procurar
        </button>
      </form>
    );
  }
}

export default Search;
