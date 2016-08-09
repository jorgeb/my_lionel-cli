import { Component,
  OnInit,
  Inject } from '@angular/core';

import {  BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
import { LvApiService, LvApiServiceProviders } from '../shared/lv-api/lv-api.service';
import { LV_CAROUSEL_DIRECTIVES } from '../shared/lv-my-lionel-stock-img/lv-carousel.component';
import { ModalDirective, MODAL_DIRECTVES } from 'ng2-bootstrap/ng2-bootstrap';

import { LvSteamTenderService, LvSteamTenderServiceProviders } from './lv-steam-tender.service';

@Component({
  moduleId: module.id,
  templateUrl: 'lv-steam-tender.html',
  styleUrls: ['css/lv-steam-tender.css'],
  directives: [LV_CAROUSEL_DIRECTIVES, MODAL_DIRECTVES],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class LvSteamTenderComponent implements OnInit {
  private myLocos:Array<any> = [];
  private myTenders:Array<any> = [];
  private mySteamByTenders:Array<any> = [];
  private myTenderBySteam:Array<any> = [];
  private tenderBySteam:Array<any> = [];
  private currentLoco:any = null;
  
  private boxImages:Array<any> = [];
    
  private imgInModal:string = null;
  
  constructor (@Inject(LvApiService) private lvApiService: LvApiService,
                @Inject(LvSteamTenderService) private lvSteamTenderService: LvSteamTenderService) {}
  
  ngOnInit() {
    this.lvSteamTenderService.getByLocoImages().subscribe( data => {
     
      this.myLocos = data;
    });
    /*
    this.lvSteamTenderService.getByTenderImages().subscribe( data => {
     
      this.myTenders = data;
    });
   */
  };

  private onNewSlide = ($event) => {
    
    this.currentLoco = $event.itemData;
    
    this.lvSteamTenderService.getBySteamTenderImages($event.itemData.lionel_id).subscribe( data => {
     
      this.myTenders = data;
      this.mySteamByTenders = [];
      this.myTenderBySteam = [];
    });
    
    this.lvSteamTenderService.getByLocoPosibleTenders($event.itemData.lionel_id).subscribe( data => {
      this.tenderBySteam = data;
    });

    this.boxImages = [];
    this.boxImages.push({box_img_url:$event.itemData.loco_box_image_url});
    
    this.lvSteamTenderService.getTenderBox($event.itemData).subscribe( data => {
      this.boxImages.push({box_img_url:data.tender_box_image_url});
    });
    
      
    //this.myTenders = 
      
  }
  
  private onNewSlideTender = ($event) => {
    
    this.lvSteamTenderService.getByTenderSteamImages($event.lionel_tender_id).subscribe( data => {
     
      this.mySteamByTenders = data;
      this.myTenderBySteam = [];
    });


  }
 
  private onNewSlideSteamTender = ($event) => {
    
  
    this.lvSteamTenderService.getBySteamTenderImages($event.lionel_id).subscribe( data => {
     
      this.myTenderBySteam = data;
    });
   
  }
  
  
  private setAssoc = (steamTender) => {
    
    let query: Array<string> = [];
    query.push('tender');
    query.push('set-assoc');
    this.lvApiService.post(query, {lionel_id_1:this.currentLoco.loco_my_lionel_items_id,
      lionel_id_2:steamTender.tender_my_lionel_items_id}).subscribe(data => {    
    });
  }
 
  private getClass = (steamTender) => {
    
    let ret = 'glyphicon glyphicon-resize-small';
    
    if(steamTender.tender_in_loco && steamTender.tender_in_loco === steamTender.loco_my_lionel_items_id  && steamTender.loco_with_tender){
      ret = 'glyphicon glyphicon-check';
    } else if (steamTender.tender_in_loco){
      ret = 'glyphicon glyphicon-ban-circle';
    }
    
    return ret;
  }
  
  private getClassLoco = (steamTender) => {
    
    let ret = '';
    
    if(steamTender.loco_with_tender && steamTender.loco_with_tender === steamTender.tender_my_lionel_items_id && steamTender.tender_in_loco){
      ret = 'glyphicon glyphicon-check';
    } else if (steamTender.loco_with_tender){
      ret = 'glyphicon glyphicon-ban-circle';
    }
    
    return ret;
  }

  private getImageUrl = (item) => {
      
      if(item.tender_image){
        //localhost:3000/img/liveauctioneer/600/0/
        return `http://localhost:3000/img/liveauctioneer/300/0/${item.tender_image.split('/').join('-')}`
      } else {
          return '';
      }
  };

};

export const LvSteamTenderComponentProviders = [
  LvApiServiceProviders,
  LvSteamTenderServiceProviders
];

//glyphicon glyphicon-remove-circle
//glyphicon glyphicon-ok-sign