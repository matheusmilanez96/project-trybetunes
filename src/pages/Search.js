import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    artistName: '',
    artistName2: '',
    isButtonDisabled: true,
    isLoading: false,
    searchOver: false,
    albumArray: [],
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

  searchArtist = async () => {
    const { artistName } = this.state;
    this.setState(
      {
        isLoading: true,
        artistName2: artistName,
      },
      async () => {
        const albums = await searchAlbumsAPI(artistName);
        this.setState({
          isLoading: false,
          searchOver: true,
          albumArray: albums,
          artistName: '',
        });
      },
    );
  };

  render() {
    const {
      isButtonDisabled,
      artistName,
      artistName2,
      isLoading,
      searchOver,
      albumArray,
    } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <form data-testid="page-search">
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
            onClick={ this.searchArtist }
          >
            Procurar
          </button>
          <span>
            { searchOver && albumArray.length > 0
              ? (
                <div>
                  <h3>
                    {`Resultado de álbuns de: ${artistName2}`}
                  </h3>
                  <ul>
                    { albumArray.map((album) => (
                      <li key={ album.collectionId }>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          { album.collectionName }
                        </Link>
                      </li>
                    )) }
                  </ul>
                </div>) : undefined }
            { searchOver && albumArray.length === 0
              ? (
                <p>
                  Nenhum álbum foi encontrado
                </p>) : undefined }
          </span>
        </form>
      </div>
    );
  }
}

export default Search;
