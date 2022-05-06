export default class YoutubeVideoSnippet {
  constructor({
    id,
    title,
    description,
    thumbnails,
    channelTitle,
    videoOwnerChannelId,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnails = thumbnails;
    this.channelTitle = channelTitle;
    this.videoOwnerChannelId = videoOwnerChannelId;
  }
}
