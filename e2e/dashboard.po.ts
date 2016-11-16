import { by, element, browser } from 'protractor';
export class DashboardPage {
  static async navigateTo() {
    return await browser.get('/');
  }

  static async getParagraphText() {
    return await element(by.css('my-app h3')).getText();
  }

  static async getElementText(selector: string) {
    return await element(by.css(selector)).getText();
  }

  static async getHero(id: string) {
    await browser.driver.findElements(by.id(id));
    return await element(by.id(id)).click();
  }
}
