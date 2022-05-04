export type HasID = { id: string };

export type YoutubePlaylistResponseType = {
  nextPageToken: string;
  items: Array<HasID>;
};

export default class YoutubePlaylistResponse {
  nextPageToken: string;
  items: Array<HasID>;

  constructor({ nextPageToken, items }: YoutubePlaylistResponseType) {
    this.nextPageToken = nextPageToken;
    this.items = items;
  }
}
