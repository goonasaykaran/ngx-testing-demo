export class E2eDemoPage {
  async sleep(time: number = 500) {
    return await browser.sleep(time)
  }

  async navigateTo() {
    return await browser.get('/');
  }

  async getParagraphText() {
    return await element(by.css('my-app h3')).getText();
  }

  async getElementText(selector: string) {
    return await element(by.css(selector)).getText();
  }

  async getHero(id: string) {
    await browser.driver.findElements(by.id(id));
    return await element(by.id(id)).click();
  }

}
