import { Component,
   OnInit,
   OnChanges,
   Inject,
   Output,
   EventEmitter,
   ChangeDetectionStrategy,
   ChangeDetectorRef} from '@angular/core';


import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { LvApiService, LvApiServiceProviders } from '../../shared/lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lv-tab-l-types',
  templateUrl: 'lv-tab-l-types.html',
  styleUrls: [],
  directives: [TAB_DIRECTIVES]
})
export class lvTabLTypesComponent implements  OnInit, OnChanges{

  
  private dataTabs:Array<{label:string,loaded:boolean,content:any,active?:boolean,typeId:number}> = [];

  @Output()
  public onTabItemTypeSelected:EventEmitter<any> = new EventEmitter();
  
  constructor (@Inject(LvApiService) private lvApiService:LvApiService,
                private cd: ChangeDetectorRef) {}

  private getDataTabs = () => {

    this.dataTabs = [];
    //http://localhost:3000/api/lionel/types
     let query:Array<string> = [];
      query.push('lionel');
      query.push('types');

      return this.lvApiService.get(query).subscribe( data => {
        
        data.forEach(tab => {
            this.dataTabs.push({
                label:tab.name,
                typeId:tab.id,
                loaded:false,
                content:[]
            });    
        });
        
        this.dataTabs[0].active = true;
        this.cd.markForCheck();
      });
     
  };


  private selectTab = (tab) => {
    
    this.onTabItemTypeSelected.emit(tab);
  }

  ngOnChanges(_){

  };
  
  ngOnInit(){
      this.getDataTabs();
  }
}

export const LvLionelItemsTabComponentProviders = [
  LvApiServiceProviders
];

