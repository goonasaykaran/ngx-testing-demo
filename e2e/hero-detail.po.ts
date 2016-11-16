export class HeroDetailPage {
  static async navigateTo(id = 12) {
    return await browser.get(`/detail/${id}`);
  }

  static async getParagraphText() {
    return await element(by.css('my-app h3')).getText();
  }
}
