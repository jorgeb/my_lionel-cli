import { Component,
  OnInit,
  Inject } from '@angular/core';

import { LvApiService, LvApiServiceProviders } from '../shared/lv-api/lv-api.service';
import { LvLionelItemsTabComponent, LvLionelItemsTabComponentProviders } from './tab/lv-lionel-items-tab.component';

@Component({
  moduleId: module.id,
  templateUrl: 'lv-lionel-items.html',
  styleUrls: [],
  directives: [LvLionelItemsTabComponent]
})
export class LvLionelItemsComponent implements OnInit {
  private lionelItems = [];
  
  constructor (@Inject(LvApiService) private lvApiService:LvApiService) {}
  
  ngOnInit(){
  };
  
};

export const LvLionelItemsComponentProviders = [
  LvLionelItemsTabComponentProviders
];