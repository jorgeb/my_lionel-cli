import { 
  Component,
  Input,
  Inject } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'lv-lionel-items-card',
  templateUrl: 'lv-lionel-items-card.html',
  styleUrls: ['css/material-cards.css'],
  directives: []
})
export class LvlionelItemsCardComponent {
  @Input()
  public title:string;
  
  @Input()
  public subTitle:string;

  @Input()
  public defaultImg:string;

  @Input()
  public description:string;
   
  constructor () {}  
}


export const LvlionelItemsCardComponentProviders = [
  
];