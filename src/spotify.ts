import API_ENDPOINTS from './endpoints';

export default class Spotify {
  accessToken = '';

  scopes: String[] = [];

  constructor(scopes: String[]) {
    this.scopes = scopes;
  }

  get authUrl() {
    return API_ENDPOINTS.AUTHORIZE(this.scopes.join('%20'));
  }

  getAccessToken() {
    const { hash } = window.location;
    if (!hash) return;

    const paramsArr = hash.substring(1).split('&');
    const params = paramsArr.reduce((prev, curr) => {
      const [key, value] = curr.split('=');
      prev[key] = value;
      return prev;
    }, {} as Record<string, string>);

    console.log({ params });

    this.accessToken = params.access_token;
  }
}
