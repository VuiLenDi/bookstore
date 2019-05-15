import { BookStorePage } from "./bookstore.po";
import { browser, logging } from "protractor";

describe("workspace-project App", () => {
  let page: BookStorePage;

  beforeEach(() => {
    page = new BookStorePage();
    page.navigateTo();
  });

  it("Addbook Form should be valid", () => {
    page.getFieldByName("title").sendKeys("The Godfather");
    page.getFieldByName("description").sendKeys("Lorem Ipsum");
    page.setValueCategory();
    let form = page.getForm().getAttribute("class");
    expect(form).toContain("ng-valid");
  });

  describe("Addbook Form should be invalid", () => {
    beforeEach(() => {
      page.navigateTo();
    });

    it("Missing input for title", () => {
      page.getFieldByName("description").sendKeys("Loprem Ipsum");
      page.setValueCategory();
      let form = page.getForm().getAttribute("class");
      expect(form).toContain("ng-invalid");
    });

    it("Missing input for category", () => {
      page.getFieldByName("title").sendKeys("Loprem Ipsum");
      page.getFieldByName("description").sendKeys("Loprem Ipsum");

      let form = page.getForm().getAttribute("class");
      expect(form).toContain("ng-invalid");
    });

    it("Missing input for description", () => {
      page.getFieldByName("title").sendKeys("Loprem Ipsum");
      page.setValueCategory();

      let form = page.getForm().getAttribute("class");
      expect(form).toContain("ng-invalid");
    });
  });

  it("Addbook successfully", async () => {
    page.getFieldByName("title").sendKeys("The Godfather");
    page.getFieldByName("description").sendKeys("Lorem Ipsum");
    page.setValueCategory();
    const beforeAddedCount = await page.getLengthOfList();
    page
      .getAddButton()
      .click()
      .then(() => {
        browser.waitForAngular().then(async () => {
          const count = await page.getLengthOfList();
          expect(count).toBeGreaterThan(beforeAddedCount);
        });
      });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
