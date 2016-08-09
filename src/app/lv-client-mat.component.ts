import { Component, ViewContainerRef } from '@angular/core';

import {Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
//import {MdIcon} from '@angular2-material/icon';

import { LvLionelItemsComponent } from './lionel_items/lv-lionel-items.component';
import { LvAmbrosebauerAuctionsPageComponent } from './ambrosebauer/lv-ambrosebauer-auctions';
import { LvMyLionelPageComponent } from './my_lionel/lv-my-lionel';
import { LvTenderComponent } from './tender/lv-tender';
import { LvSteamTenderComponent } from './steam-tender/lv-steam-tender.component';
import { LvMyCollectionComponent } from './my_collection/lv-my-collection';


@Component({
  moduleId: module.id,
  selector: 'lv-client-mat-app',
  templateUrl: 'lv-client-mat.component.html',
  styleUrls: ['lv-client-mat.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers:[ROUTER_PROVIDERS]
})

@Routes([
    { path: "/lionel_items", component: LvLionelItemsComponent },
    { path: "/ambrosebauer_auctions", component: LvAmbrosebauerAuctionsPageComponent },
    { path: "/my_lionel", component: LvMyLionelPageComponent },
    { path: "/tenders", component: LvTenderComponent },
    { path: "/steam-tender", component: LvSteamTenderComponent },
    { path: "/my_collection", component: LvMyCollectionComponent },
  
])
export class LvClientMatAppComponent  {
  
  private viewContainerRef;
  public constructor(viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}
