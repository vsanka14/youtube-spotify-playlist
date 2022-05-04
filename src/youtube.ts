import { YOUTUBE_ENDPOINTS } from './endpoints';
import {
  ApiResponse,
  YoutubePlaylistResponse,
  YoutubePlaylistItemResponse,
  Snippet,
} from './types';

export default class YouTube {
  videos: Array<Snippet> = [];

  async fetchApi<T extends object>(url: string): Promise<ApiResponse<T>> {
    try {
      const resp = await fetch(url);
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
      console.error(
        `An error occurred while performing AJAX request for ${url}`,
        err
      );
      return {
        ok: false,
        message: 'Something went wrong!',
      };
    }
  }

  async fetchPlaylistItem(id: string) {
    const url = YOUTUBE_ENDPOINTS.PLAYLIST_ITEM(id);
    const resp = await this.fetchApi<YoutubePlaylistItemResponse>(url);

    if (!resp.data) return;

    const { items } = resp.data;
    return items[0].snippet;
  }

  async fetchPlaylistItems(playlistId: string, pageToken?: string) {
    const snippets: Array<Snippet> = [];
    const url = YOUTUBE_ENDPOINTS.PLAYLIST(playlistId, 50, pageToken);
    const resp = await this.fetchApi<YoutubePlaylistResponse>(url);

    if (!resp.data) return;

    const { items, nextPageToken } = resp.data;

    for (const item of items) {
      const snippet = await this.fetchPlaylistItem(item.id);
      if (snippet) {
        snippets.push(snippet);
      }
    }

    this.videos.push(...snippets);

    if (nextPageToken) {
      this.fetchPlaylistItems(playlistId, nextPageToken);
    }
  }
}
