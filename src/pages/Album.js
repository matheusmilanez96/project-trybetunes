import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends Component {
  state = {
    tracklist: [],
    artistName: '',
    albumName: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getTracklist(id);
  }

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
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h4 data-testid="album-name">{ albumName }</h4>
        { tracklist.map((track) => (
          <MusicCard
            key={ track.trackId }
            track={ track }
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
