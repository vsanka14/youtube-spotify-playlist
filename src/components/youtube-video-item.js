import template from "./youtube-video-item.html?raw";

export default class YoutubeVideoItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    const thumbnailImgEl = this.querySelector("[data-video-thumbnail]");
    const videoTitleEl = this.querySelector("[data-video-title]");
    const channelTitleEl = this.querySelector("[data-channel-title]");
    thumbnailImgEl.src = this.getAttribute("thumbnail");
    videoTitleEl.textContent = this.getAttribute("videoTitle");
    channelTitleEl.textContent = this.getAttribute("channelTitle");
  }
}
