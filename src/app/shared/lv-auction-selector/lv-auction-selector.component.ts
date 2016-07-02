
import { 
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  Inject} from '@angular/core';

import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  selector: 'lv-auction-selector',
  templateUrl: 'lv-auction-selector.html',
  styleUrls: [],
  directives: [DROPDOWN_DIRECTIVES]
})
export class LvAuctionSelectorComponent implements OnChanges {
  @Input()
  public auctioneer:number;
  
  @Output() 
  onAuctionChange: EventEmitter<number> = new EventEmitter();
  
  private auctions:any;
    
  constructor (@Inject(LvApiService) private lvApiService:LvApiService) {}

  ngOnChanges(_){
     
      this.updateComponent();
  };
  
  private updateComponent = () => {
    
    if(this.auctioneer){
      
      let query:Array<string> = [];
      query.push('auctioneer');
      query.push(this.auctioneer.toString());
      query.push('auctions');

      this.lvApiService.get(query).subscribe( data => {
        
        this.auctions = data;
      });
      
    }; 
  };
  
  private changeSelector = (auctionId:number) => {
     
      this.onAuctionChange.emit(auctionId);
  };
}

export const LvAuctionSelectorComponentProviders = [
  LvApiServiceProviders
];
