import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import 'rxjs/add/operator/map';

import { LvClientMatAppComponent, environment } from './app/';
import { LvTabPagerComponentProviders } from './app/shared/lv-tab-pager/lv-tab-pager.component';
import { LvTenderComponentProviders } from './app/tender/lv-tender';
import { LvSteamTenderComponentProviders } from './app/steam-tender/lv-steam-tender.component';
import { LvMyCollectionComponentProviders } from './app/my_collection/lv-my-collection';

if (environment.production) {
  enableProdMode();
}

bootstrap(LvClientMatAppComponent, 
  [
    LvTabPagerComponentProviders,
    LvTenderComponentProviders, 
    LvSteamTenderComponentProviders,
    LvMyCollectionComponentProviders]);
