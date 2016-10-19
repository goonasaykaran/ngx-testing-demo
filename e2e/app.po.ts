export class E2eDemoPage {
  sleep(time: number = 500) {
    return browser.sleep(time)
  }

  async navigateTo() {
    browser.get('/');
    return this.sleep(1000);
  }

  getParagraphText() {
    return element(by.css('my-app > h1')).getText();
  }

  async getHero() {
    this.sleep(1750);
    await browser.driver.findElements(by.id('Narco'));
    return element(by.id('Narco')).click();
  }

}
