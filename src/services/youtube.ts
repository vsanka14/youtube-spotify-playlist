import { YOUTUBE_ENDPOINTS } from '../endpoints';
import fetchApi from '../utils/fetch-api';
import YoutubeVideoSnippet, {
  YoutubeVideoSnippetType,
} from '../models/youtube-video-snippet';
import YoutubePlaylistResponse, {
  YoutubePlaylistResponseType,
} from '../models/youtube-playlist-response';
import YoutubePlaylistItemResponse, {
  YoutubePlaylistItemResponseType,
} from '../models/youtube-playlist-item-response';

export default class YouTube {
  videos: Array<YoutubeVideoSnippetType> = [];

  async fetchPlaylistItem(id: string) {
    const url = YOUTUBE_ENDPOINTS.PLAYLIST_ITEM(id);
    const resp = await fetchApi<YoutubePlaylistItemResponseType>(
      url,
      YoutubePlaylistItemResponse
    );

    if (!resp.data) return;

    const { items } = resp.data;
    return items[0].snippet;
  }

  async fetchPlaylistItems(playlistId: string, pageToken?: string) {
    const snippets: Array<YoutubeVideoSnippetType> = [];
    const url = YOUTUBE_ENDPOINTS.PLAYLIST(playlistId, 50, pageToken);
    const resp = await fetchApi<YoutubePlaylistResponseType>(
      url,
      YoutubePlaylistResponse
    );

    if (!resp.data) return;

    const { items, nextPageToken } = resp.data;

    for (const item of items) {
      const snippet = await this.fetchPlaylistItem(item.id);
      if (snippet) {
        snippets.push(new YoutubeVideoSnippet(snippet));
      }
    }

    this.videos.push(...snippets);

    if (nextPageToken) {
      this.fetchPlaylistItems(playlistId, nextPageToken);
    }
  }
}
