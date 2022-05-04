const spotifyAuthorizeEndpoint = import.meta.env
  .VITE_SPOTIFY_AUTHORIZE_ENDPOINT;
const spotifyClientId = import.meta.env.VITE_CLIENT_ID;
const spotifyRedirectUrl = import.meta.env.VITE_REDIRECT_URI_AFTER_LOGIN;
const spotifyBaseUrl = import.meta.env.VITE_SPOTIFY_BASE_URL;

export const SPOTIFY_ENDPOINTS = {
  AUTHORIZE: (scopes: string) =>
    `${spotifyAuthorizeEndpoint}?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUrl}&scope=${scopes}&response_type=token&show_dialog=true`,
  ME: `${spotifyBaseUrl}/me`,
};
