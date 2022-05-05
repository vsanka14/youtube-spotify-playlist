import { SpotifyTrackType } from 'youtube-spotify-playlist/models/spotify-track';

export type SpotifyTrackItems = {
  items: Array<SpotifyTrackType>;
};

export type SpotifyTracks = {
  tracks: SpotifyTrackItems;
};

export type SpotifyTracksReponseType = {
  tracks: SpotifyTracks;
};

export default class SpotifyTracksReponse {
  tracks: SpotifyTracks;

  constructor(tracks: SpotifyTracks) {
    this.tracks = tracks;
  }
}
