import getUrlParams from "../utils/get-url-params";

export default class MainApp extends HTMLElement {
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
    this.firstElementChild?.remove();

    const params = getUrlParams(window.location.search);
    const step = params?.step;

    if (!step) {
      const stepZeroEl = document.createElement("step-three");
      this.append(stepZeroEl);
    }

    if (step === "1") {
      const stepOneEl = document.createElement("step-four");
      this.append(stepOneEl);
    }
  }

  connectedCallback() {
    this.classList.add(
      "w-1/2",
      "h-full",
      "flex",
      "justify-center",
      "items-center"
    );
    this.render();
  }
}
