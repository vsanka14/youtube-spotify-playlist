export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type HasDefaultThumbnail = { default: Thumbnail };

export type HasMediumThumbnail = { medium: Thumbnail };

export type HasHighThumbnail = { high: Thumbnail };

export type YoutubeVideoSnippetType = {
  id: string;
  title: string;
  description: string;
  thumbnails: HasDefaultThumbnail & HasMediumThumbnail & HasHighThumbnail;
  channelTitle: string;
  videoOwnerChannelId: string;
};

export default class YoutubeVideoSnippet {
  id: string;
  title: string;
  description: string;
  thumbnails: HasDefaultThumbnail & HasMediumThumbnail & HasHighThumbnail;
  channelTitle: string;
  videoOwnerChannelId: string;

  constructor({
    id,
    title,
    description,
    thumbnails,
    channelTitle,
    videoOwnerChannelId,
  }: YoutubeVideoSnippetType) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnails = thumbnails;
    this.channelTitle = channelTitle;
    this.videoOwnerChannelId = videoOwnerChannelId;
  }
}
