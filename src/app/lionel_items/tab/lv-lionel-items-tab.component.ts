import { Component,
   OnInit,
   OnChanges,
   Inject,
   ChangeDetectionStrategy,
   ChangeDetectorRef} from '@angular/core';

import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { LvlionelItemsCardComponent, LvlionelItemsCardComponentProviders } from '../card/lv-lionel-items-card.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { LvApiService, LvApiServiceProviders } from '../../shared/lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lv-lionel-items-tab',
  templateUrl: 'lv-lionel-items-tab.html',
  styleUrls: [],
  directives: [TAB_DIRECTIVES, LvlionelItemsCardComponent]
})
export class LvLionelItemsTabComponent implements  OnInit, OnChanges{

  
  private dataTabs:Array<{label:string,loaded:boolean,content:any,active?:boolean,typeId:number}> = [];

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

  private getContentData = (typeId) => {

//http://localhost:3000/api/lionel/8/items
    let query:Array<string> = [];
    query.push('lionel');
    query.push(typeId.toString());
    query.push('items');

    return this.lvApiService.get(query);
  };

  private getTabContent = (tab) => {

    if(!tab.loaded){

      this.getContentData(tab.typeId).subscribe( data => {
        
        tab.content = data;
        tab.loaded = true;
        
        this.cd.markForCheck();
      });
    }
  };


  private selectTab = (tab) => {
    
    this.getTabContent(tab);
  }

  private updateComponent = () => {

      this.getDataTabs();
  };

  ngOnChanges(_){

  };
  
  ngOnInit(){
      this.updateComponent();
  }
}

export const LvLionelItemsTabComponentProviders = [
  LvApiServiceProviders,
  LvlionelItemsCardComponentProviders
];

