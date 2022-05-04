import { SPOTIFY_ENDPOINTS } from 'youtube-spotify-playlist/constants/spotify-endpoints';
import fetchApi from 'youtube-spotify-playlist/utils/fetch-api';
import SpotifyMeResponse, {
  SpotifyMeResponseType,
} from 'youtube-spotify-playlist/models/spotify-me-response';

export default class Spotify {
  accessToken: string = '';

  scopes: String[] = [];

  me: SpotifyMeResponseType | null;

  constructor(scopes: String[]) {
    this.me = null;
    this.scopes = scopes;
  }

  get authUrl() {
    const scopesStr = this.scopes.join('%20');
    return SPOTIFY_ENDPOINTS.AUTHORIZE(scopesStr);
  }

  get defaultHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
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

  async getMe() {
    const resp = await fetchApi<SpotifyMeResponseType>(
      SPOTIFY_ENDPOINTS.ME,
      SpotifyMeResponse,
      this.defaultHeaders
    );
    if (!resp.data) return;
    this.me = resp.data;
  }
}
