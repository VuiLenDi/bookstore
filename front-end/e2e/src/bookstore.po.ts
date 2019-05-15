import { browser, by, element } from "protractor";

export class BookStorePage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getFieldByName(name: string) {
    return element(by.name(name));
  }

  setValueCategory() {
    return element(by.id("category"))
      .click()
      .then(() => {
        return element(by.id("mat-option-0")).click();
      });
  }

  getAddButton() {
    return element(
      by.cssContainingText("button.addbook-button", "Add")
    )
  }

  getForm() {
    return element(by.tagName("form"));
  }

  getLengthOfList() {
    return element.all(by.css('ul li')).count();
  }
}
