export default class HiMom extends HTMLElement {
  rendered: boolean = false;

  render() {
    this.innerHTML = 'Hi mom!';
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}
