import 'twind/shim';
import PlaylistInputForm from 'youtube-spotify-playlist/components/playlist-input-form';
import MainApp from 'youtube-spotify-playlist/components/main-app';

customElements.define('main-app', MainApp);
customElements.define('playlist-input-form', PlaylistInputForm);

// (async function () {
//   customElements.define('main-app', MainApp);
//   customElements.define('playlist-input-form', PlaylistInputForm);

//   const youtube = new YouTube();

//   // const spotify = new Spotify([
//   //   'user-read-private',
//   //   'playlist-modify-public',
//   //   'playlist-modify-private',
//   // ]);

//   // await spotify.getMe();

//   // await youtube.fetchPlaylistItems('PL4o_8rq4jbYXy3AkXi0c_SXV_iC_qnDoy');

//   // const searchResults = youtube.videos.reduce((prev, curr) => {
//   //   spotify.searchForTrack(curr.title).then((res) => {
//   //     prev[curr.id] = res;
//   //   });
//   //   return prev;
//   // }, {} as Record<string, SpotifyTrackType | undefined>);

//   // console.log({ searchResults });

//   // const loginBtn = document.getElementById('loginBtn');
//   // loginBtn?.addEventListener('click', function () {
//   //   window.location.assign(spotify.authUrl);
//   // });
// })();
