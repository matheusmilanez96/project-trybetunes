import React, { Component } from 'react';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    tracklist: [],
    artistName: '',
    albumName: '',
  };

  componentDidMount() {
    const id = window.location.pathname.split('/').pop();
    console.log(id);
    this.getTracklist(id);
  }

  getTracklist = async (id) => {
    const tracklist = await getMusics(id);
    this.setState({
      artistName: tracklist[0].artistName,
      albumName: tracklist[0].collectionName,
    });
    tracklist.shift();
    this.setState({
      tracklist,
    });
  };

  render() {
    const {
      tracklist,
      artistName,
      albumName,
    } = this.state;
    return (
      <div>
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h4 data-testid="album-name">{ albumName }</h4>
        <MusicCard
          tracklist={ tracklist }
        />
      </div>
    );
  }
}

export default Album;
