import './style.css';
import Spotify from './spotify';

(async function () {
  const spotify = new Spotify([
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ]);

  const loginBtn = document.getElementById('loginBtn');
  const loginSuccessMsg = document.getElementById('loginSuccessMsg');

  spotify.getAccessToken();
  const resp = await spotify.getMe();

  if (resp.ok) {
    loginBtn?.remove();
  } else {
    loginSuccessMsg?.remove();
  }

  loginBtn?.addEventListener('click', function () {
    window.location.assign(spotify.authUrl);
  });
})();
