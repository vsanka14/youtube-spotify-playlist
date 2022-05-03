import './style.css';
import Spotify from './spotify';

const spotify = new Spotify([
  'user-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
]);

const loginBtn = document.getElementById('loginBtn');
loginBtn?.addEventListener('click', function () {
  window.location.assign(spotify.authUrl);
});

spotify.getAccessToken();
