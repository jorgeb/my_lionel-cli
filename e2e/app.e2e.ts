import { LvClientMatPage } from './app.po';

describe('lv-client-mat App', function() {
  let page: LvClientMatPage;

  beforeEach(() => {
    page = new LvClientMatPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('lv-client-mat works!');
  });
});
