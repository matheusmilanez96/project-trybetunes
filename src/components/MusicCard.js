import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  onCheck = async () => {
    const { track } = this.props;
    const { trackId, trackName, previewUrl } = track;
    this.setState({ isLoading: true });
    await addSong({
      trackId,
      trackName,
      previewUrl,
    });
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  };

  render() {
    const { track } = this.props;
    const { isLoading, isChecked } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <p key={ track.trackId }>
          { track.trackName }
          <audio data-testid="audio-component" src={ track.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorites">
            Favorita
            <input
              type="checkbox"
              name="favorites"
              data-testid={ `checkbox-music-${track.trackId}` }
              checked={ isChecked }
              onChange={ this.onCheck }
            />
          </label>
        </p>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
