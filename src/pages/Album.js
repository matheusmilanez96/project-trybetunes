import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    tracklist: [],
    artistName: '',
    albumName: '',
    isLoading: false,
    favs: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { match: { params: { id } } } = this.props;
    this.getTracklist(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favs: [...favoriteSongs],
    });
  }

  favCheck = (track) => {
    const { trackId } = track;
    const { favs } = this.state;
    return favs.some((song) => song.trackId === trackId);
  };

  getTracklist = async (id) => {
    const tl = await getMusics(id);
    this.setState({
      artistName: tl[0].artistName,
      albumName: tl[0].collectionName,
      tracklist: tl.filter((result) => tl.indexOf(result) !== 0),
    });
  };

  render() {
    const {
      tracklist,
      artistName,
      albumName,
      isLoading,
    } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h4 data-testid="album-name">{ albumName }</h4>
        { tracklist.map((track) => (
          <MusicCard
            key={ track.trackId }
            track={ track }
            isFav={ this.favCheck(track) }
          />
        )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
