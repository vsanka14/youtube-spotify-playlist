import template from "./step-three.html?raw";
import { spotify } from "../services/spotify";
import getUrlParams from "../utils/get-url-params";
import updateUrlParams from "../utils/update-url-params";

export default class StepThree extends HTMLElement {
  constructor() {
    super();

    const params = getUrlParams(window.location.hash);
    if (params.access_token) {
      spotify.accessToken = params.access_token;
      localStorage.setItem("spotifyAccessToken", params.access_token);
      updateUrlParams({ step: 1 });
    }
  }

  connectedCallback() {
    this.innerHTML = template;
    const loginBtn = this.querySelector("[data-login-with-spotify]");
    loginBtn.addEventListener("click", () => {
      console.log("called");
      console.log(spotify.authUrl);
      window.location.assign(spotify.authUrl);
    });
  }
}
