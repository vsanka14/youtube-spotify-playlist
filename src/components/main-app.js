import template from "./main-app.html?raw";
import getUrlParams from "../utils/get-url-params";

export default class MainApp extends HTMLElement {
  containerEl;

  constructor() {
    super();
    window.addEventListener("popstate", () => this.render());
  }

  updateQueryParams(step, playlistId) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("step", step);
    queryParams.set("playlistId", playlistId);
    history.pushState(null, null, "?" + queryParams.toString());
  }

  render() {
    const containerEl = this.querySelector("[data-test-container]");
    containerEl.firstElementChild?.remove();

    const params = getUrlParams(window.location.search);
    const step = params?.step;
    const playlistId = params?.playlistId || "";

    if (!step) {
      const stepZeroEl = document.createElement("step-zero");
      containerEl.append(stepZeroEl);
    }

    if (step === "1") {
      const stepOneEl = document.createElement("step-one");
      stepOneEl.setAttribute("playlistId", playlistId);
      containerEl.append(stepOneEl);
    }
  }

  connectedCallback() {
    this.innerHTML = template;
    this.render();
  }
}
