export type SpotifyArtist = {
  href: string;
  id: string;
  name: string;
  uri: string;
};

export type SpotifyImage = {
  width: number;
  height: number;
  url: string;
};

export type SpotifyAlbum = {
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
};

export type SpotifyTrackItemType = {
  album: SpotifyAlbum;
  artists: Array<SpotifyArtist>;
  href: string;
  id: string;
  name: string;
  uri: string;
};

export default class SpotifyTrackItem {
  album: SpotifyAlbum;
  artists: Array<SpotifyArtist>;
  href: string;
  id: string;
  name: string;
  uri: string;

  constructor({ album, artists, href, id, name, uri }: SpotifyTrackItemType) {
    this.album = album;
    this.artists = artists;
    this.href = href;
    this.id = id;
    this.name = name;
    this.uri = uri;
  }
}
