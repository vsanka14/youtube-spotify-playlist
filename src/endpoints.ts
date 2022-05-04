const spotifyAuthorizeEndpoint = import.meta.env
  .VITE_SPOTIFY_AUTHORIZE_ENDPOINT;
const spotifyClientId = import.meta.env.VITE_CLIENT_ID;
const spotifyRedirectUrl = import.meta.env.VITE_REDIRECT_URI_AFTER_LOGIN;
const spotifyBaseUrl = import.meta.env.VITE_SPOTIFY_BASE_URL;

const youtubeBaseUrl = import.meta.env.VITE_GOOGLE_BASE_URL;
const youtubeApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const SPOTIFY_ENDPOINTS = {
  AUTHORIZE: (scopes: string) =>
    `${spotifyAuthorizeEndpoint}?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUrl}&scope=${scopes}&response_type=token&show_dialog=true`,
  ME: `${spotifyBaseUrl}/me`,
};

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
