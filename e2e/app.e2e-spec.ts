import { LiteVersionPage } from './app.po';

describe('lite-version App', () => {
  let page: LiteVersionPage;

  beforeEach(() => {
    page = new LiteVersionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
