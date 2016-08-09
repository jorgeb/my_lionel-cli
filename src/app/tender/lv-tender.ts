import { Component,
  OnInit,
  Inject } from '@angular/core';

import {  BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
import { LvApiService, LvApiServiceProviders } from '../shared/lv-api/lv-api.service';
import { LV_CAROUSEL_DIRECTIVES } from '../shared/lv-my-lionel-stock-img/lv-carousel.component';
import { ModalDirective, MODAL_DIRECTVES } from 'ng2-bootstrap/ng2-bootstrap';
import { LvTenderTabComponent, LvTenderTabComponentProviders } from './tab/lv-tender-tab.component';

@Component({
  moduleId: module.id,
  templateUrl: 'lv-tender.html',
  styleUrls: ['css/tender.css'],
  directives: [LvTenderTabComponent, LV_CAROUSEL_DIRECTIVES, MODAL_DIRECTVES],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class LvTenderComponent implements OnInit {
  private myTenders = [];
  private myTendersImgs = [];
  private currentImg = {my_lionel_items_id:null};  
  private saving = false;
  
  constructor (@Inject(LvApiService) private lvApiService: LvApiService) {}
  
  ngOnInit() {
    
    let query: Array<string> = [];
    query.push('tender');
    query.push('my-items-images');
    query.push('false');
    
    this.lvApiService.get(query).subscribe(myTenders => {
      this.myTenders = myTenders;

      this.myTenders.forEach( img => {
        
        let imgToShow = this.myTendersImgs.find (i => {
          return i.my_lionel_items_id === img.my_lionel_items_id;
        });
        
        if (imgToShow) {
            imgToShow.extraImg.push(img);
        } else {
          
          img.extraImg = [];
          this.myTendersImgs.push(img);
        };
      })
    });

  };

  private onNewSlide = ($event) => {
    
    this.currentImg = $event.itemData;
  }
  
  private onHearted = ($event) => {
    
      let query: Array<string> = [];
      query.push('tender');
      query.push('save-extended-tender');
      
      this.saving = true;
      this.lvApiService.post(query, {my_lionel_items_id:this.currentImg.my_lionel_items_id,lionel_tender_id:$event}).subscribe(data => {
          this.saving = false;
      });
  }
 
};

export const LvTenderComponentProviders = [
  LvTenderTabComponentProviders,
  LvApiServiceProviders
];