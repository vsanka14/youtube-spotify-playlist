export type HasHref = { href: string };

export type HasID = { id: string };

export type HasName = { name: string };

export type HasURI = { uri: string };

export type SpotifyArtist = HasHref & HasID & HasName & HasURI;

export type SpotifyImage = {
  width: number;
  height: number;
  url: string;
};

export type SpotifyAlbum = HasHref &
  HasID &
  HasName & {
    images: Array<SpotifyImage>;
  };

export type SpotifyTrackType = HasHref &
  HasID &
  HasName &
  HasURI & {
    album: SpotifyAlbum;
    artists: Array<SpotifyArtist>;
  };

export default class SpotifyTrack {
  album: SpotifyAlbum;
  artists: Array<SpotifyArtist>;
  href: string;
  id: string;
  name: string;
  uri: string;

  constructor({ album, artists, href, id, name, uri }: SpotifyTrackType) {
    this.album = album;
    this.artists = artists;
    this.href = href;
    this.id = id;
    this.name = name;
    this.uri = uri;
  }
}
