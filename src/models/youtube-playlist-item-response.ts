import { YoutubeVideoSnippetType } from './youtube-video-snippet';

export type HasSnippet = { snippet: YoutubeVideoSnippetType };

export type YoutubePlaylistItemResponseType = {
  id: string;
  items: Array<HasSnippet>;
};

export default class YoutubePlaylistItemResponse {
  id: string;
  items: Array<HasSnippet>;

  constructor({ id, items }: YoutubePlaylistItemResponseType) {
    this.id = id;
    this.items = items;
  }
}
