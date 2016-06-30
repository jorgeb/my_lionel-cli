import { 
  Component,
  Input,
  Inject } from '@angular/core';

import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  selector: 'lv-card',
  templateUrl: 'lv-card.html',
  styleUrls: ['css/material-cards.css'],
  directives: []
})
export class LvCardComponent {
  @Input()
  public title:string;
  
  @Input()
  public subTitle:string;

  @Input()
  public defaultImg:string;

  @Input()
  public description:string;

  @Input()
  public url:string;
 
  @Input()
  public watched:Boolean;

  @Input()
  public auctionItemId:number;
  
  constructor (@Inject(LvApiService) private lvApiService:LvApiService) {}
  
 private onCLickWatch = (watch:boolean) => {
   this.watched = watch;
   
   let query: Array<string> = [];
   query.push('auction_item');
   query.push(this.auctionItemId.toString());
   query.push('setwatch');
   query.push(String(watch));

   this.lvApiService.get(query).subscribe(data => {
     console.log('http://localhost:3000/api/auction_item/445/setwatch/false');

   });

   //http://localhost:3000/api/auction_item/445/setwatch/false
 }
}


export const LvCardComponentProviders = [
  LvApiServiceProviders
];