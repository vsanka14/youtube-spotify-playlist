import template from "./step-zero.html?raw";
import getUrlParams from "../utils/get-url-params";
import updateUrlParams from "../utils/update-url-params";

const ERROR_MESSAGES = {
  INVALID_URL: "Please enter a valid URL.",
  INVALID_YOUTUBE_PLAYLIST_URL:
    "Please enter a valid YouTube playlist URL. For example: https://www.youtube.com/playlist?list=PL4o_8rq4jbYXy3AkXi0c_SXV_iC_qnDoy.",
  NO_VIDEOS_FOUND: "Could not retrieve videos for the playlist. :(",
};

export default class StepZero extends HTMLElement {
  playlistInputEl;

  errorMessageEl;

  constructor() {
    super();
    this.addEventListener("submit", this.onSubmit);
  }

  async onSubmit(e) {
    e.preventDefault();
    const playilstUrlValue = this.playlistInputEl.value;
    this.validateInput(playilstUrlValue);
  }

  connectedCallback() {
    this.innerHTML = template;
    this.playlistInputEl = this.querySelector("[data-playilst-url]");
    this.playlistInputEl.addEventListener("keydown", () => this.renderError());
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

  validateInput(str) {
    let errorMessage = "";
    try {
      const url = new URL(str);
      if (url.hostname !== "www.youtube.com") {
        errorMessage = ERROR_MESSAGES.INVALID_YOUTUBE_PLAYLIST_URL;
      }
      const params = getUrlParams(url.search);
      if (!params.list) {
        errorMessage = ERROR_MESSAGES.INVALID_YOUTUBE_PLAYLIST_URL;
      }
      errorMessage = "";
      updateUrlParams({ step: 1, playlistId: params.list });
    } catch {
      errorMessage = ERROR_MESSAGES.INVALID_URL;
    } finally {
      this.renderError(errorMessage);
    }
  }
}
