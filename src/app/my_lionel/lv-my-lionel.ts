import { Component,
  OnInit,
  ViewChild,
  Inject } from '@angular/core';

import { LvLionelFilterComponent } from '../shared/lv-lionel-filter/lv-lionel-filter.component';
import { LvMyLionelStockImgComponent } from '../shared/lv-my-lionel-stock-img/lv-my-lionel-stock-img.component';
import { LvSaveOptionComponent, LvSaveOptions, ActionTypes, SaveTypes } from '../shared/lv-save-option/lv-save-option.component';
import { LvMyLionelCurrentImg } from '../shared/lv-my-lionel-current-img/lv-my-lionel-current-img.component';
import { LvApiService, LvApiServiceProviders } from '../shared/lv-api/lv-api.service';

@Component({
  moduleId: module.id,
  selector: 'lv-my-lionel-page',
  templateUrl: 'lv-my-lionel.html',
  styleUrls: ['css/lv-my-lionel.css'],
  directives: [LvLionelFilterComponent, LvMyLionelStockImgComponent, LvSaveOptionComponent, LvMyLionelCurrentImg],
  providers:[]
})
export class LvMyLionelPageComponent implements OnInit {

  @ViewChild(LvMyLionelStockImgComponent) lvMyLionelStockImgComponent:LvMyLionelStockImgComponent;
  @ViewChild(LvSaveOptionComponent) lvSaveOptionComponent:LvSaveOptionComponent;
  @ViewChild(LvLionelFilterComponent) lvLionelFilterComponent:LvLionelFilterComponent;
  
  private optSave:LvSaveOptions = new LvSaveOptions();
  private currentToSave = {
    imgUrl:null,
    myLionelItem:null,
    boxId:null
  };
  
  private lastSaved = {imgUrl:null,lionel_id:null,name:null,my_lionel_id:null};
  
  constructor(@Inject(LvApiService) private lvApiService: LvApiService) { }
  
  ngOnInit(){};
  
  private onSelectedItem = (item) => {
    console.log(item,this.optSave)
    this.lvMyLionelStockImgComponent.NextImage();
          
    if (this.optSave.type === SaveTypes.Box) {
      //save
        let query: Array<string> = [];
        query.push('my_lionel');
        query.push('boxes');

        this.lvApiService.post(query,{image_url:this.currentToSave.imgUrl}).subscribe(data => {
            
            this.lvSaveOptionComponent.update();
        });

    } else {

      if (this.optSave.action !== ActionTypes.Skip) {


        let toSave = {
          image_url: this.currentToSave.imgUrl,
          lionel_id: item.item.id,
          box_id: this.optSave.boxId,
          id: 0
        };


        if (this.optSave.action === ActionTypes.New) {

          this.lastSaved.imgUrl = this.currentToSave.imgUrl;
          this.lastSaved.name = item.item.name;
          this.lastSaved.lionel_id = item.item.lionel_id;

        } else if (this.optSave.action === ActionTypes.Add) {

          console.log(item.myLionelExisten.id)
          console.log(this.lastSaved.my_lionel_id)

          if (item.myLionelExisten.id) {

            this.currentToSave.myLionelItem = item.myLionelExisten.id;
          } else {

            this.currentToSave.myLionelItem = this.lastSaved.my_lionel_id;
          }

          toSave.id = this.currentToSave.myLionelItem;
        }

        //save
        let query: Array<string> = [];
        query.push('my_lionel');
        query.push('items');

        this.lvApiService.post(query, toSave).subscribe(data => {

          this.lastSaved.my_lionel_id = data.myLionelItem.id;
          this.lvLionelFilterComponent.updateMyLionelItems();
        });
      }
    }
    
  console.log(this.currentToSave)
  
    this.optSave.type = SaveTypes.Lionel;
    this.optSave.action = ActionTypes.New;

  }

  private onTypeKeyChange = (key) => {
    this.optSave.type = this.getNextOfEnum(SaveTypes,this.optSave.type); 
  }

  private onActionKeyChange = (key) => {
    this.optSave.action = this.getNextOfEnum(ActionTypes,this.optSave.action); 
  }

  private onNewImage = (slide) => {
    this.currentToSave.imgUrl = slide.itemData.img;
  }
   
  private onItemKeyChange = (slide) => {
    this.currentToSave.imgUrl = slide.itemData.img;
  } 
  
  private getLengthOfEnum(e:any): number {
        
    let toArray = Object.keys(e);

    return toArray.filter((key) => {
      return parseInt(key, 10) >= 0;
    }).length;
  }
  
  private getNextOfEnum(e:any, ce: number){

    let ret = e;
    let length = this.getLengthOfEnum(e);
    
    let nextInd = ce + 1;
    
    if( length === nextInd){
      nextInd = 0;
    }
    
    return nextInd;
  }

}
