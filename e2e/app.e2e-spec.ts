import { E2eDemoPage } from './app.po';

describe('e2e-demo App', function() {
  let page: E2eDemoPage;

  beforeEach(() => {
    page = new E2eDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
