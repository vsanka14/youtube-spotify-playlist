import template from "./step-four.html?raw";
import { youtube } from "../services/youtube";
import { spotify } from "../services/spotify";
import getUrlParams from "../utils/get-url-params";

const ERROR_MESSAGES = {
  INVALID_URL: "Please enter a valid URL.",
  INVALID_YOUTUBE_PLAYLIST_URL:
    "Please enter a valid YouTube playlist URL. For example: https://www.youtube.com/playlist?list=PL4o_8rq4jbYXy3AkXi0c_SXV_iC_qnDoy.",
  NO_VIDEOS_FOUND: "Could not retrieve videos for the playlist. :(",
};

export default class StepFour extends HTMLElement {
  playlistId;

  connectedCallback() {
    this.classList.add("w-full", "h-full");
    this.innerHTML = template;
    this.playlistInputEl = this.querySelector("[data-playlist-url]");
    this.playlistInputEl.addEventListener("keydown", () => this.renderError());
    const submitBtn = this.querySelector("[data-submit-btn]");
    submitBtn.addEventListener("click", () => this.onSubmit());
  }

  async onSubmit() {
    const playilstUrlValue = this.playlistInputEl.value;
    this.validateInput(playilstUrlValue);
    if (this.playlistId) {
      console.log(this.playlistId);
      await youtube.fetchPlaylistItems(this.playlistId);
      const searchResults = youtube.videos.reduce((prev, curr) => {
        spotify.searchForTrack(curr.title).then((res) => {
          prev[curr.id] = res;
        });
        return prev;
      }, {});
      console.log({ searchResults });
    }
  }

  renderError(errorMessage) {
    const errorMessageEl = this.querySelector("[data-playlist-url-error]");
    if (errorMessage) {
      this.playlistInputEl.classList.add("border", "border-red-500");
      errorMessageEl.style.display = "block";
      errorMessageEl.textContent = errorMessage;
    } else {
      this.playlistInputEl.classList.remove("border", "border-red-500");
      errorMessageEl.style.display = "none";
    }
  }

  async validateInput(str) {
    let errorMessage = "";
    try {
      const url = new URL(str);

      if (url.hostname !== "www.youtube.com") {
        errorMessage = ERROR_MESSAGES.INVALID_YOUTUBE_PLAYLIST_URL;
        return;
      }

      const params = getUrlParams(url.search);
      const playlistId = params.list;

      if (!playlistId) {
        errorMessage = ERROR_MESSAGES.INVALID_YOUTUBE_PLAYLIST_URL;
        return;
      }

      errorMessage = "";
      this.playlistId = playlistId;
    } catch (err) {
      console.error(err);
      errorMessage = ERROR_MESSAGES.INVALID_URL;
    } finally {
      this.renderError(errorMessage);
    }
  }
}
