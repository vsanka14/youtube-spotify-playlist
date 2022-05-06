export default class SpotifyMeResponse {
  constructor({ country, displayName, email, href, id, images, uri }) {
    this.country = country;
    this.displayName = displayName;
    this.email = email;
    this.href = href;
    this.id = id;
    this.images = images;
    this.uri = uri;
  }
}
