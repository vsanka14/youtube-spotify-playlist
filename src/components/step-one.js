import template from "./step-one.html?raw";
import { youtube } from "../services/youtube";

export default class StepOne extends HTMLElement {
  get errorMessage() {
    return this.errorMessage || "";
  }

  set errorMessage(val) {
    if (val) {
      console.log("placeholder to display error message");
    }
  }

  connectedCallback() {
    this.innerHTML = template;
    const playlistId = this.getAttribute("playlistId");
    this.fetchPlaylistItems(playlistId);
  }

  async fetchPlaylistItems(playlistId) {
    if (!playlistId) return;

    await youtube.fetchPlaylistItems(playlistId);
    if (youtube.isNoVideosFound) {
      this.errorMessage = ERROR_MESSAGES.NO_VIDEOS_FOUND;
    }
    console.log({ videos: youtube.videos });
  }
}
