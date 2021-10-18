import { createElement } from "lwc";
import LwcCreateCertification from "c/lwcCreateCertification";

/*
    Created By: Liam Hunt
    date: 10/17/2021
    Tests the Create Certification LWC
    Coverage: 
*/
describe("c-lwc-create-certification", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  let element;

  beforeEach(() => {
    element = createElement("c-lwc-create-certification", {
      is: LwcCreateCertification
    });
  });

  it("Test record-form", () => {
    // append element to DOM
    document.body.appendChild(element);

    // get the lightning-record-form
    const form = element.shadowRoot.querySelector("lightning-record-form");

    // check that recordId doesn't yet exist
    expect(form.recordId).toBeFalsy();

    // simulate the onsuccess event
    form.dispatchEvent(new CustomEvent("success"));

    // check that recordId is reset to null
    return Promise.resolve().then(() => {
      expect(form.recordId).toBeFalsy();
    });
  });
});
