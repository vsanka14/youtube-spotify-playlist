import { SPOTIFY_ENDPOINTS } from './endpoints';
import { ApiResponse } from './types';

export default class Spotify {
  accessToken: string = '';

  scopes: String[] = [];

  constructor(scopes: String[]) {
    this.scopes = scopes;
  }

  get authUrl() {
    const scopesStr = this.scopes.join('%20');
    return SPOTIFY_ENDPOINTS.AUTHORIZE(scopesStr);
  }

  get defaultHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
  }

  getAccessToken() {
    const { hash } = window.location;
    const paramsArr = hash.substring(1).split('&');
    const params = paramsArr.reduce((prev, curr) => {
      const [key, value] = curr.split('=');
      prev[key] = value;
      return prev;
    }, {} as Record<string, string>);
    this.accessToken = params.access_token || '';
  }

  async fetchApi(url: string) {
    try {
      const resp = await fetch(url, {
        ...this.defaultHeaders,
      });
      const json = await resp.json();
      if (json.error) {
        return {
          ok: false,
          message: json.error.message,
        };
      }
      return {
        ok: true,
        data: json,
      };
    } catch (err) {
      console.error(err);
      return {
        ok: false,
        message: 'Something went wrong!',
      };
    }
  }

  async getMe(): Promise<ApiResponse<object>> {
    const me = await this.fetchApi(SPOTIFY_ENDPOINTS.ME);
    return me;
  }
}
