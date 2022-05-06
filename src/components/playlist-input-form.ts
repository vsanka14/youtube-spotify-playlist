import template from './playlist-input-form.html?raw';
import YouTube from 'youtube-spotify-playlist/services/youtube';

export const youtube = new YouTube();

export default class PlaylistInputForm extends HTMLElement {
  submitBtn: HTMLButtonElement;

  constructor() {
    super();
    this.innerHTML = template;

    this.addEventListener('submit', this.onSubmit);
    this.submitBtn = this.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
  }

  async onSubmit(e: Event) {
    e.preventDefault();

    const inputEl = this.querySelector(
      '[data-playlist-url-input]'
    ) as HTMLFormElement;
    const playlistUrl = inputEl.value;
    const initialTextContent = this.submitBtn.textContent;
    this.submitBtn.textContent = 'Loading ⌛';
    await youtube.fetchPlaylistItems(playlistUrl);
    this.submitBtn.textContent = initialTextContent;
  }
}
