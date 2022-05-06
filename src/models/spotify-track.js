export default class SpotifyTrack {
  constructor({ album, artists, href, id, name, uri }) {
    this.album = album;
    this.artists = artists;
    this.href = href;
    this.id = id;
    this.name = name;
    this.uri = uri;
  }
}
