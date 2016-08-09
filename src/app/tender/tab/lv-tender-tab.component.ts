import { Component,
   OnInit,
   OnChanges,
   EventEmitter,
   Inject,
   Output,
   ChangeDetectionStrategy,
   ChangeDetectorRef} from '@angular/core';

import { LvTenderCardComponent, LvTenderCardComponentProviders } from '../card/lv-tender-card.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { LvApiService, LvApiServiceProviders } from '../../shared/lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lv-tender-tab',
  templateUrl: 'lv-tender-tab.html',
  styleUrls: ['css/lv-tender-tab.css'],
  directives: [TAB_DIRECTIVES, LvTenderCardComponent]
})
export class LvTenderTabComponent implements  OnInit, OnChanges{

  @Output()
  public onHearted: EventEmitter<any> = new EventEmitter();
  
  private dataTabs:Array<{label:string,loaded:boolean,content:any,active?:boolean,typeId:number}> = [];

  constructor (@Inject(LvApiService) private lvApiService:LvApiService,
                private cd: ChangeDetectorRef) {}

  private getDataTabs = () => {

    this.dataTabs = [];
    //http://localhost:3000/api/lionel/types
     let query:Array<string> = [];
      query.push('tender');
      query.push('types');

      return this.lvApiService.get(query).subscribe( data => {
        
        data.forEach(tab => {
            this.dataTabs.push({
                label:tab.type_tender,
                typeId:tab.type_tender,
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
    query.push('tender');
    query.push('types');
    query.push(typeId);
    

    return this.lvApiService.get(query);
  };

  private getTabContent = (tab) => {

    if(!tab.loaded){

      this.getContentData(tab.typeId).subscribe( data => {
        
        tab.content = data;
        tab.loaded = true;
        console.log(data)
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

  private getImageUrl = (item) => {
      
      if(item.max){
        //localhost:3000/img/liveauctioneer/600/0/
        return `http://localhost:3000/img/liveauctioneer/600/0/${item.max.split('/').join('-')}`
      } else {
          return '';
      }
  };
  
  ngOnChanges(_){

  };
  
  ngOnInit(){
      this.updateComponent();
  }
  
  private tabHarted = ($event) => {
    
    this.onHearted.emit($event.subTitle);
  }
}

export const LvTenderTabComponentProviders = [
  LvApiServiceProviders,
  LvTenderCardComponentProviders
];

