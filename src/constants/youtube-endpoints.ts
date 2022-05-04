const youtubeBaseUrl = import.meta.env.VITE_GOOGLE_BASE_URL;
const youtubeApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const YOUTUBE_ENDPOINTS = {
  PLAYLIST: (
    playlistId: string,
    maxResults: number = 50,
    pageToken?: string
  ) => {
    let url = `${youtubeBaseUrl}/playlistItems?playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=${maxResults}`;
    if (pageToken) {
      url = `${url}&pageToken=${pageToken}`;
    }
    return url;
  },
  PLAYLIST_ITEM: (id: string) =>
    `${youtubeBaseUrl}/playlistItems?id=${id}&key=${youtubeApiKey}&maxResults=1&part=snippet`,
};
