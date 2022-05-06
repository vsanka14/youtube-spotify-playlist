import { YOUTUBE_ENDPOINTS } from "../constants/youtube-endpoints";
import fetchApi from "../utils/fetch-api";
import YoutubeVideoSnippet from "../models/youtube-video-snippet";
import YoutubePlaylistResponse from "../models/youtube-playlist-response";
import YoutubePlaylistItemResponse from "../models/youtube-playlist-item-response";

export default class YouTube {
  videos = [];

  async fetchPlaylistItem(id) {
    const url = YOUTUBE_ENDPOINTS.PLAYLIST_ITEM(id);
    const resp =
      (await fetchApi) <
      YoutubePlaylistItemResponseType >
      {
        url,
        from: YoutubePlaylistItemResponse,
      };

    if (!resp.ok) return;

    const { items } = resp.data;
    return items[0].snippet;
  }

  async fetchPlaylistItems(playlistId, pageToken) {
    const snippets = [];
    const url = YOUTUBE_ENDPOINTS.PLAYLIST(playlistId, 50, pageToken);
    const resp =
      (await fetchApi) <
      YoutubePlaylistResponseType >
      {
        url,
        from: YoutubePlaylistResponse,
      };

    if (!resp.ok) return;

    const { items, nextPageToken } = resp.data;
    for (const item of items) {
      const snippet = await this.fetchPlaylistItem(item.id);
      if (snippet) {
        snippets.push(new YoutubeVideoSnippet({ ...snippet, id: item.id }));
      }
    }
    this.videos.push(...snippets);
    if (nextPageToken) {
      this.fetchPlaylistItems(playlistId, nextPageToken);
    }
  }
}
