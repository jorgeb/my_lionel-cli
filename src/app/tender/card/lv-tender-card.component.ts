import {
  Component,
  Input,
  Inject,
  Output,
  EventEmitter,
ChangeDetectorRef } from '@angular/core';

import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import { LvApiService, LvApiServiceProviders } from '../../shared/lv-api/lv-api.service';
import { LV_CAROUSEL_DIRECTIVES } from '../../shared/lv-my-lionel-stock-img/lv-carousel.component';


@Component({
  moduleId: module.id,
  selector: 'lv-tender-card',
  templateUrl: 'lv-tender-card.html',
  styleUrls: ['css/material-cards.css'],
  viewProviders: [BS_VIEW_PROVIDERS],
  directives: [MODAL_DIRECTVES, LV_CAROUSEL_DIRECTIVES]
})
export class LvTenderCardComponent {
  @Input()
  public title: string;

  @Input()
  public subTitle: string;

  @Input()
  public defaultImg: string;

  @Input()
  public description: string;
  
  @Output()
  public onHearted: EventEmitter<any> = new EventEmitter();
  
  private allImages = [];
  private images = [];
  private steams = [];
  private currentSteamTenderImage = null;
  private imgForModal = null;
  
  constructor( @Inject(LvApiService) private lvApiService: LvApiService,
                private cd: ChangeDetectorRef) { }

  private getSteamFromImg = (imgs:Array<any>):Array<any> => {
    
    let ret:Array<any> = [];
    
    imgs.forEach(img => {
      if(ret.indexOf(img.lionel_id) == -1){
        ret.push(img.lionel_id);
      }  
    });
    
    return ret;
  };
  
    private getImageUrl = (item) => {
      
      if(item.image_url){
        //localhost:3000/img/liveauctioneer/600/0/
        return `http://localhost:3000/img/liveauctioneer/1200/0/${item.image_url.split('/').join('-')}`
      } else {
          return '';
      }
  };

  private hearted = ($event) => {
    
    this.onHearted.emit(this);
  };
  
  private selectSteam = (steam) => {
    
    this.images = this.allImages.filter(img => {   
      return img.lionel_id === steam.label; 
    });
  };
  
  private ShowingModal = ($event) => {

    if (this.images.length == 0) {
      let query: Array<string> = [];
      query.push('tender');
      query.push('images');
      query.push(this.subTitle);

      this.lvApiService.get(query).subscribe(images => {
        this.steams = this.getSteamFromImg(images).map( img => {
          return {label:img};
        });
        
        this.allImages = images;
        
        this.images = images.filter(img => {   
          return img.lionel_id === this.steams[0].label; 
        });
        
        this.cd.markForCheck();
      });
    }

  };

  private setDefault = () => {
     let query: Array<string> = [];
        query.push('tender');
        query.push('set-default-image');
        this.lvApiService.post(query, this.currentSteamTenderImage).subscribe(data => {
           
           this.defaultImg = `http://localhost:3000/img/liveauctioneer/600/0/${this.currentSteamTenderImage.image_url.split('/').join('-')}`;
            
        });
  };

  private onNewSlide = ($event) => {
    this.currentSteamTenderImage = $event.itemData;
  }; 
}


export const LvTenderCardComponentProviders = [
  LvApiServiceProviders
];