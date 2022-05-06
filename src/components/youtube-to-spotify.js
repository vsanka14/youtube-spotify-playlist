import template from "./youtube-to-spotify.html?raw";

export default class YoutubeToSpotify extends HTMLElement {
  isRendered = false;

  render() {
    this.innerHTML = template;
  }

  connectedCallback() {
    if (this.isRendered) return;
    this.render();
    this.isRendered = true;
  }
}
