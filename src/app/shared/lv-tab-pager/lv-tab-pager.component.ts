import { Component,
   Input,
   OnInit,
   OnChanges,
   Inject,
   ChangeDetectionStrategy,
   ChangeDetectorRef} from '@angular/core';

import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { FaComponent } from 'angular2-fontawesome';
import { LvCardComponent, LvCardComponentProviders } from '../lv-card/lv-card.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lv-tab-pager',
  templateUrl: 'lv-tab-pager.html',
  styleUrls: [],
  directives: [TAB_DIRECTIVES, FaComponent, LvCardComponent]
})
export class LvTabPagerComponent implements  OnInit, OnChanges{

  @Input()
  public auctionId:number;
  
  private dataTabs:Array<{label:string,loaded:boolean,from:number,to:number,content:any,active?:boolean}> = [];
  private itemsBytab:number = 36;

  constructor (@Inject(LvApiService) private lvApiService:LvApiService,
                private cd: ChangeDetectorRef) {}

  private getDataTabs = (data) => {

    let tabs = (data.count / this.itemsBytab) | 0;
    this.dataTabs = [];
    
    for(let i=0; i<tabs; i++){
      this.dataTabs.push({
        label:`${(i * this.itemsBytab) + 1} - ${(i + 1) * this.itemsBytab}`,
        loaded:false,
        from:(i * this.itemsBytab) + 1,
        to:(i + 1) * this.itemsBytab,
        content:[]
      });
    }

    let rest = data.count % this.itemsBytab;

    if ( rest != 0)
      this.dataTabs.push({
        label:`${(tabs * this.itemsBytab) + 1} - ${(tabs * this.itemsBytab) + rest}`,
        loaded:false,
        from:(tabs * this.itemsBytab) + 1,
        to:(tabs * this.itemsBytab) + rest,
        content:[]
      });

  };

  private getContentData = (from) => {

    let query:Array<string> = [];
    query.push('auction_item');
    query.push(this.auctionId.toString());
    query.push('pager');
    query.push(this.itemsBytab.toString());
    query.push( (from - 1).toString() );

    return this.lvApiService.get(query);
  };

  private getTabContent = (tab) => {

    if(!tab.loaded){

      this.getContentData(tab.from).subscribe( data => {
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
    
    if(this.auctionId){
      
      let query:Array<string> = [];
      query.push('auction_item');
      query.push(this.auctionId.toString());
      query.push('count');

      this.lvApiService.get(query).subscribe( data => {

        this.getDataTabs(data);
        this.dataTabs[0].active = true;
              
        this.cd.markForCheck();
      });
    }
  };

  ngOnChanges(_){
    
    this.updateComponent();
  };
  
  ngOnInit(){
  }
}

export const LvTabPagerComponentProviders = [
  LvApiServiceProviders,
  LvCardComponentProviders
];

