const authorizeEndpoint = import.meta.env.VITE_SPOTIFY_AUTHORIZE_ENDPOINT;
const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUrl = import.meta.env.VITE_REDIRECT_URI_AFTER_LOGIN;
const baseUrl = import.meta.env.VITE_SPOTIFY_BASE_URL;

const ENDPOINTS = {
  AUTHORIZE: (scopes: string) =>
    `${authorizeEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes}&response_type=token&show_dialog=true`,
  ME: `${baseUrl}/me`,
};

export default ENDPOINTS;
