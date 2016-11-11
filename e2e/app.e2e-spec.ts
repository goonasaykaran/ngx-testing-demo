import { E2eDemoPage } from './app.po';

describe('e2e-demo App', () => {
  let page: E2eDemoPage;

  beforeEach(async() => {
    page = new E2eDemoPage();
    await page.navigateTo();
  });

  it('should display message saying Top Heroes', async() => {
    expect(page.getParagraphText()).toEqual('Top Heroes');
  });

  describe('navigation events', async() => {
    const hero = 'Narco';
    const heroSelector = 'my-hero-detail h2';
    const backSelector = 'back';
    beforeEach(async() => {
      await page.getHero(hero);
    });
    it('to hero when clicked', async() => {
      await browser.driver.findElements(by.css(heroSelector));
      const elementText = await page.getElementText(heroSelector);
      expect(elementText).toBe(`${hero} details!`);
    });

    it('should navigate back to dashboard when back is clicked', async() => {
      await browser.driver.findElements(by.id(backSelector));
      await element(by.id(backSelector)).click();
      expect(page.getParagraphText()).toEqual('Top Heroes');
    })
  })

});
