export interface ApiResponse<T extends object> {
  ok: boolean;
  message?: string;
  data?: T;
}

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Snippet = {
  title: string;
  description: string;
  thumbnails: HasDefaultThumbnail & HasMediumThumbnail & HasHighThumbnail;
  channelTitle: string;
  videoOwnerChannelId: string;
};

export type HasKind = { kind: string };

export type HasEtag = { etag: string };

export type HasNextPageToken = { nextPageToken: string };

export type HasID = { id: string };

export type HasDefaultThumbnail = { default: Thumbnail };

export type HasMediumThumbnail = { medium: Thumbnail };

export type HasHighThumbnail = { high: Thumbnail };

export type HasSnippet = { snippet: Snippet };

export type YoutubePlaylistItemResponse = HasKind &
  HasEtag &
  HasID & {
    items: Array<HasSnippet>;
  };

export type YoutubePlaylistResponse = HasKind &
  HasEtag &
  HasNextPageToken & {
    items: Array<HasID>;
  };
