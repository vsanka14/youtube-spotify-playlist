import template from "./playlist-input-form.html?raw";

export default class PlaylistInputForm extends HTMLElement {
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
