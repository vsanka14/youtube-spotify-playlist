import template from "./step-one.html?raw";
import { youtube } from "../services/youtube";

export default class StepOne extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.fetchVideos();
  }

  async fetchVideos() {
    const playlistId = this.getAttribute("playlistId");
    await youtube.fetchPlaylistItems(playlistId);
    this.renderVideoItems();
  }

  renderVideoItems() {
    youtube.videos.forEach((video) => {
      const youtubeVideoItem = document.createElement("youtube-video-item");
      youtubeVideoItem.setAttribute("thumbnail", video.thumbnails.default.url);
      youtubeVideoItem.setAttribute("videoTitle", video.title);
      youtubeVideoItem.setAttribute("channelTitle", video.channelTitle);
      this.append(youtubeVideoItem);
    });
  }
}
