import { 
  Component,
  Input,
  Inject } from '@angular/core';

import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';
import { TimerWrapper } from '@angular/core/src/facade/async';
@Component({
  moduleId: module.id,
  selector: 'lv-card-2',
  templateUrl: 'lv-card-2.html',
  styleUrls: ['css/lv-card-2.css'],
  directives: []
})
export class LvCard2Component {
  @Input()
  public title:string = 'Test';
  
  @Input()
  public subTitle:string = 'Test';

  @Input()
  public defaultImg:string;

  @Input()
  public description:string = 'Test';

  @Input()
  public url:string;
 
  @Input()
  public watched:Boolean;

  @Input()
  public auctionItemId:number;

  @Input()
  public thumbnails:Array<string>;
  
  private showDescription:boolean = false;
  private active:boolean = false;
  
  constructor (@Inject(LvApiService) private lvApiService:LvApiService) {}
  
  
  private onShowDescription = () => {
      
        this.showDescription = true;
        this.active = !this.active;
        
        TimerWrapper.setTimeout(() => {
            this.showDescription = false;
            }, 380);
  };
  
 private onCLickWatch = (watch:boolean) => {
   this.watched = watch;
   /*
   let query: Array<string> = [];
   query.push('auction_item');
   query.push(this.auctionItemId.toString());
   query.push('setwatch');
   query.push(String(watch));

   this.lvApiService.get(query).subscribe(data => {

   });
*/
   //http://localhost:3000/api/auction_item/445/setwatch/false
 }
}


export const LvCard2ComponentProviders = [
  LvApiServiceProviders
];