import { Component,
  OnInit } from '@angular/core';

import { LvLionelFilterComponent } from '../shared/lv-lionel-filter/lv-lionel-filter.component';

@Component({
  moduleId: module.id,
  selector: 'lv-my-lionel-page',
  templateUrl: 'lv-my-lionel.html',
  directives: [LvLionelFilterComponent],
  providers:[]
})
export class LvMyLionelPageComponent implements OnInit {

  ngOnInit(){

  };
}
