import { Component } from '@angular/core';

import {Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
//import {MdIcon} from '@angular2-material/icon';

import { LvLionelItemsComponent } from './lionel_items/lv-lionel-items.component';
import { LvAmbrosebauerAuctionsPageComponent } from './ambrosebauer/lv-ambrosebauer-auctions';
import { LvMyLionelPageComponent } from './my_lionel/lv-my-lionel';

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
    { path: "/my_lionel", component: LvMyLionelPageComponent }
])
export class LvClientMatAppComponent  {
}
