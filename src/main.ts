import './style.css';
import Spotify from './spotify';
import YouTube from './youtube';

(async function () {
  const spotify = new Spotify([
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ]);

  const youtube = new YouTube();

  const loginBtn = document.getElementById('loginBtn');
  const loginSuccessMsg = document.getElementById('loginSuccessMsg');

  spotify.getAccessToken();
  const resp = await spotify.getMe();

  await youtube.fetchPlaylistItems('PL4o_8rq4jbYXy3AkXi0c_SXV_iC_qnDoy');

  if (resp.ok) {
    loginBtn?.remove();
  } else {
    loginSuccessMsg?.remove();
  }

  loginBtn?.addEventListener('click', function () {
    window.location.assign(spotify.authUrl);
  });
})();
