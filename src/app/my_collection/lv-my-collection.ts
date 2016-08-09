import { Component,
  OnInit,
  Inject } from '@angular/core';

import { LvApiService, LvApiServiceProviders } from '../shared/lv-api/lv-api.service';
import { LvCard2Component, LvCard2ComponentProviders } from '../shared/lv-card-2/lv-card-2.component';
import { lvTabLTypesComponent, LvLionelItemsTabComponentProviders } from '../shared/lv-tab-l-types/lv-tab-l-types.component';

@Component({
  moduleId: module.id,
  templateUrl: 'lv-my-collection.html',
  styleUrls: [],
  directives: [LvCard2Component,lvTabLTypesComponent]
})
export class LvMyCollectionComponent implements OnInit {
  private lionelItems = [];
  
  constructor (@Inject(LvApiService) private lvApiService:LvApiService) {}
  
  ngOnInit(){
  };
  
  private getThumbnails = (item) => {
    
    let ret = [];
    let base = 'http://localhost:3000/img/my_lionel/stock-square/344/';
    let slice = 4;
    
    ret.push(base + item.box_image_url)
    
    if(item.arr_image_url_asoc) {
      slice--;
      ret.push(base + item.arr_image_url_asoc)
    }
    
    let itemImgs = item.arr_image_url_extend.split(',')
      .slice(1,slice)
      .map( i => {
        
        return base + i;
      });
      
    return ret.concat(itemImgs);
  }
  
  private onTabItemTypeSelected = ($event) => {
    //http://localhost:3000/api/my_lionel/items-by-type/8
    console.log($event)
    let query:Array<string> = [];
    query.push('my_lionel');
    query.push('items-by-type');
    query.push($event.typeId);
    
    return this.lvApiService.get(query).subscribe( data => {
            
      this.lionelItems = data.filter(itm => {
        return itm.my_lionel_items_id;
      });
      
    });

  };
};

export const LvMyCollectionComponentProviders = [
  LvApiServiceProviders,
  LvCard2ComponentProviders,
  LvLionelItemsTabComponentProviders
];