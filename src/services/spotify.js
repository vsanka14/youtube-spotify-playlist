import { SPOTIFY_ENDPOINTS } from "../constants/spotify-endpoints";
import fetchApi from "../utils/fetch-api";
import SpotifyMeResponse from "../models/spotify-me-response";
import SpotifyTracksReponse from "../models/spotify-tracks-response";
import SpotifyTrack from "../models/spotify-track";

export default class Spotify {
  scopes = [];

  constructor(scopes) {
    this.scopes = scopes;
  }

  get authUrl() {
    const scopesStr = this.scopes.join("%20");
    return SPOTIFY_ENDPOINTS.AUTHORIZE(scopesStr);
  }

  get accessToken() {
    return this.accessToken || localStorage.getItem("spotifyAccessToken");
  }

  set accessToken(val) {
    this.val = val;
  }

  get defaultHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  sanitizeQuery(query) {
    query = query
      .replace(/ *[\[\(\{][^)]*[\)\]\}] */g, "")
      .replace(/ *(HD|HQ|720p|1080p|4k) */g, "")
      .replace(/ *(of+icial *)?(music *)?video/g, "")
      .replace(/lyrics?/gi, "")
      .replace(/(feat|ft|featuring)\..*$/gi, "")
      .replace(/with.*$/gi, "");
    query = query.split("-")[1] || query.split("-")[0];
    query = query.trim();
    return query;
  }

  async getMe() {
    const resp = await fetchApi({
      url: SPOTIFY_ENDPOINTS.ME,
      from: SpotifyMeResponse,
      headers: this.defaultHeaders,
    });

    if (!resp.ok) return;

    return resp.data;
  }

  async searchForTrack(query) {
    query = this.sanitizeQuery(query);
    const url = SPOTIFY_ENDPOINTS.SEARCH(query);
    const resp = await fetchApi({
      url,
      from: SpotifyTracksReponse,
      headers: this.defaultHeaders,
    });

    if (!resp.ok) return;

    const { tracks } = resp.data;

    if (!tracks.tracks.items.length) return;

    return new SpotifyTrack(tracks.tracks.items[0]);
  }
}

export const spotify = new Spotify([
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
]);

console.log({ spotify });
