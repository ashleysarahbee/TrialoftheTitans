import { LightningElement, track } from "lwc";

export default class NewsModal extends LightningElement {
  @track displayModal = true;

  toggleModal() {
    this.displayModal = !this.displayModal;
  }
}
