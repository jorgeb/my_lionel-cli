import { Component,
  OnInit } from '@angular/core';

import { LvLionelFilterComponent } from '../shared/lv-lionel-filter/lv-lionel-filter.component';
import { LvMyLionelStockImgComponent } from '../shared/lv-my-lionel-stock-img/lv-my-lionel-stock-img.component';

@Component({
  moduleId: module.id,
  selector: 'lv-my-lionel-page',
  templateUrl: 'lv-my-lionel.html',
  directives: [LvLionelFilterComponent, LvMyLionelStockImgComponent],
  providers:[]
})
export class LvMyLionelPageComponent implements OnInit {

  ngOnInit(){

  };
  
  private onSelectedItem = (item) => {
   console.log(item.item); 
  }
  
}
