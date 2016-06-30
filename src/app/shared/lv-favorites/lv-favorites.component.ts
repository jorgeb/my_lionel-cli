import {
  Component,
  Input,
  Inject,
  OnChanges} from '@angular/core';

import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  selector: 'lv-favorites',
  templateUrl: 'lv-favorites.html',
  styleUrls: ['css/lv-favorites.css'],
  directives: []
})
export class LvFavoritesComponent implements OnChanges {
  @Input()
  public auctionId:number;

  private data;
  constructor (@Inject(LvApiService) private lvApiService:LvApiService) {}

ngOnChanges(_) {

  if(this.auctionId){
    let query: Array<string> = [];
    query.push('auction_item');
    query.push(this.auctionId.toString());
    query.push('favorites');

    this.lvApiService.get(query).subscribe(data => {
      this.data = data;
      console.log(data)
    });
  };
};

 private onCLickWatch = (watch:boolean) => {
   /*this.watched = watch;

   let query: Array<string> = [];
   query.push('auction');
   query.push(this.auctionId.toString());
   query.push('favorites');

   this.lvApiService.get(query).subscribe(data => {
     console.log(data)
   });
*/
   //http://localhost:3000/api/auction_item/445/setwatch/false
 }
}


export const LvFavoritesComponentProviders = [
  LvApiServiceProviders
];
