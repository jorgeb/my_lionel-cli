import { Component,
  OnInit } from '@angular/core';


import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
//import {MdIcon} from '@angular2-material/icon';

import { LvTabPagerComponent } from '../shared/lv-tab-pager/lv-tab-pager.component';
import { LvAuctionSelectorComponent } from '../shared/lv-auction-selector/lv-auction-selector.component';
import { LvFavoritesComponent, LvFavoritesComponentProviders } from '../shared/lv-favorites/lv-favorites.component';

@Component({
  moduleId: module.id,
  selector: 'lv-ambrosebauer-auctions-page',
  templateUrl: 'lv-ambrosebauer-auctions.html',
  directives: [LvTabPagerComponent, LvAuctionSelectorComponent, LvFavoritesComponent],
  providers:[ MD_BUTTON_DIRECTIVES, MD_LIST_DIRECTIVES, LvFavoritesComponentProviders]
})
export class LvAmbrosebauerAuctionsPageComponent implements OnInit {
  private auctionId:number = 1;
  private auctioneer;

  ngOnInit(){

    this.auctioneer = 1;
  };

  private onAuctionChange = (auctionId) => {
    
    console.log(auctionId)
    this.auctionId = auctionId;
  };
}
