import template from './main-app.html?raw';

export default class MainApp extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = template;
  }
}
