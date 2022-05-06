export default class YoutubePlaylistResponse {
  constructor({ nextPageToken, items }) {
    this.nextPageToken = nextPageToken;
    this.items = items;
  }
}
