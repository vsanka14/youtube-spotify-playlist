export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type HasDefaultThumbnail = { default: Thumbnail };

export type HasMediumThumbnail = { medium: Thumbnail };

export type HasHighThumbnail = { high: Thumbnail };

export type YoutubeVideoSnippetType = {
  title: string;
  description: string;
  thumbnails: HasDefaultThumbnail & HasMediumThumbnail & HasHighThumbnail;
  channelTitle: string;
  videoOwnerChannelId: string;
};

export default class YoutubeVideoSnippet {
  title: string;
  description: string;
  thumbnails: HasDefaultThumbnail & HasMediumThumbnail & HasHighThumbnail;
  channelTitle: string;
  videoOwnerChannelId: string;

  constructor({
    title,
    description,
    thumbnails,
    channelTitle,
    videoOwnerChannelId,
  }: YoutubeVideoSnippetType) {
    this.title = title;
    this.description = description;
    this.thumbnails = thumbnails;
    this.channelTitle = channelTitle;
    this.videoOwnerChannelId = videoOwnerChannelId;
  }
}
