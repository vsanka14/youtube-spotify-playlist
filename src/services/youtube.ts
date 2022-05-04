import { YOUTUBE_ENDPOINTS } from 'youtube-spotify-playlist/constants/youtube-endpoints';
import fetchApi from 'youtube-spotify-playlist/utils/fetch-api';
import YoutubeVideoSnippet, {
  YoutubeVideoSnippetType,
} from 'youtube-spotify-playlist/models/youtube-video-snippet';
import YoutubePlaylistResponse, {
  YoutubePlaylistResponseType,
} from 'youtube-spotify-playlist/models/youtube-playlist-response';
import YoutubePlaylistItemResponse, {
  YoutubePlaylistItemResponseType,
} from 'youtube-spotify-playlist/models/youtube-playlist-item-response';

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
