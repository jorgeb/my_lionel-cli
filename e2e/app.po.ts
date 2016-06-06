export class LvClientMatPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lv-client-mat-app h1')).getText();
  }
}
