import { SPOTIFY_ENDPOINTS } from 'youtube-spotify-playlist/constants/spotify-endpoints';
import fetchApi from 'youtube-spotify-playlist/utils/fetch-api';
import SpotifyMeResponse, {
  SpotifyMeResponseType,
} from 'youtube-spotify-playlist/models/spotify-me-response';
import SpotifyTracksReponse, {
  SpotifyTracksReponseType,
} from 'youtube-spotify-playlist/models/spotify-tracks-response';
import SpotifyTrackItem from 'youtube-spotify-playlist/models/spotify-track-item';

export default class Spotify {
  scopes: String[] = [];

  me: SpotifyMeResponseType | undefined;

  constructor(scopes: String[]) {
    this.scopes = scopes;
  }

  get accessToken() {
    const { hash } = window.location;
    const paramsArr = hash.substring(1).split('&');
    const params = paramsArr.reduce((prev, curr) => {
      const [key, value] = curr.split('=');
      prev[key] = value;
      return prev;
    }, {} as Record<string, string>);
    return params.access_token || '';
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

  sanitizeQuery(query: string) {
    query = query
      .replace(/ *[\[\(\{][^)]*[\)\]\}] */g, '')
      .replace(/ *(HD|HQ|720p|1080p|4k) */g, '')
      .replace(/ *(of+icial *)?(music *)?video/g, '')
      .replace(/lyrics?/gi, '')
      .replace(/(feat|ft|featuring)\..*$/gi, '')
      .replace(/with.*$/gi, '');

    query = query.split('-')[1] || query.split('-')[0];

    query = query.trim();

    return query;
  }

  async getMe() {
    const resp = await fetchApi<SpotifyMeResponseType>({
      url: SPOTIFY_ENDPOINTS.ME,
      from: SpotifyMeResponse,
      headers: this.defaultHeaders,
    });
    if (!resp.data) return;
    this.me = resp.data;
  }

  async searchForTrack(query: string) {
    query = this.sanitizeQuery(query);

    const url = SPOTIFY_ENDPOINTS.SEARCH(query);
    const resp = await fetchApi<SpotifyTracksReponseType>({
      url,
      from: SpotifyTracksReponse,
      headers: this.defaultHeaders,
    });

    if (!resp.data) return;

    const { tracks } = resp.data;

    if (!tracks.tracks.items.length) return;

    return new SpotifyTrackItem(tracks.tracks.items[0]);
  }
}
