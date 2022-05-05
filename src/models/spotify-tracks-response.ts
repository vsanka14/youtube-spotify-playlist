import { SpotifyTrackItemType } from './spotify-track-item';

export type SpotifyTrackItems = {
  items: Array<SpotifyTrackItemType>;
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
