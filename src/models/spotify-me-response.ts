export type SpotifyMeResponseType = {
  country: string;
  displayName: string;
  email: string;
  href: string;
  id: string;
  images: {
    height?: number;
    url: string;
    width?: number;
  };
  uri: string;
};

export default class SpotifyMeResponse {
  country: string;
  displayName: string;
  email: string;
  href: string;
  id: string;
  images: {
    height?: number;
    url: string;
    width?: number;
  };
  uri: string;

  constructor({
    country,
    displayName,
    email,
    href,
    id,
    images,
    uri,
  }: SpotifyMeResponse) {
    this.country = country;
    this.displayName = displayName;
    this.email = email;
    this.href = href;
    this.id = id;
    this.images = images;
    this.uri = uri;
  }
}
