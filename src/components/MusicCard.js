import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { tracklist } = this.props;
    return (
      <div>
        { tracklist.map((track) => (
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
          </p>
        )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  tracklist: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  })).isRequired,
};
export default MusicCard;
