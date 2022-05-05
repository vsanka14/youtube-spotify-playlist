import 'youtube-spotify-playlist/style.css';
import Spotify from 'youtube-spotify-playlist/services/spotify';
import YouTube from 'youtube-spotify-playlist/services/youtube';
import SpotifyTrackItem from './models/spotify-track-item';

(async function () {
  const spotify = new Spotify([
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ]);

  const youtube = new YouTube();

  await spotify.getMe();

  await youtube.fetchPlaylistItems('PL4o_8rq4jbYXy3AkXi0c_SXV_iC_qnDoy');

  const searchResults = youtube.videos.reduce((prev, curr) => {
    spotify.searchForTrack(curr.title).then((res) => {
      prev[curr.id] = res;
    });
    return prev;
  }, {} as Record<string, SpotifyTrackItem | undefined>);

  console.log({ searchResults });
  const loginBtn = document.getElementById('loginBtn');
  loginBtn?.addEventListener('click', function () {
    window.location.assign(spotify.authUrl);
  });
})();
