import { E2eDemoPage } from './app.po';

describe('e2e-demo App', function() {
  let page: E2eDemoPage;

  beforeEach(() => {
    page = new E2eDemoPage();
  });

  it('should display message saying app works', async () => {
    await page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });

  it('should navigate to hero when clicked', async () => {
    await page.navigateTo();
    await page.getHero();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });
});
