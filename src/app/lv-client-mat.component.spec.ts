import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { LvClientMatAppComponent } from '../app/lv-client-mat.component';

beforeEachProviders(() => [LvClientMatAppComponent]);

describe('App: LvClientMat', () => {
  it('should create the app',
      inject([LvClientMatAppComponent], (app: LvClientMatAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'lv-client-mat works!\'',
      inject([LvClientMatAppComponent], (app: LvClientMatAppComponent) => {
    expect(app.title).toEqual('lv-client-mat works!');
  }));
});
