import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import 'rxjs/add/operator/map';

import { LvClientMatAppComponent, environment } from './app/';
import { LvTabPagerComponentProviders } from './app/shared/lv-tab-pager/lv-tab-pager.component';

if (environment.production) {
  enableProdMode();
}

bootstrap(LvClientMatAppComponent, LvTabPagerComponentProviders);
