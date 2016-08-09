
import { Component,
    OnInit,
    OnChanges,
    Input,
    Inject} from '@angular/core';

import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';
import { TypeaheadUtils } from '../lv-lionel-filter/typeahead-utils';

@Component({
    moduleId: module.id,
    selector: 'lv-my-lionel-items',
    templateUrl: 'lv-my-lionel-items.html',
    styleUrls: ['css/lv-my-lionel-items.css'],
    //directives: [BUTTON_DIRECTIVES, LV_CAROUSEL_DIRECTIVES]
})
export class LvMyLionelItems implements OnInit, OnChanges {
    
    @Input()
    lionelTofound:string;    
    
    private myLionelItems = [];
    private myLionelItemsFiltered = [];
    
    private index = null;
    
    constructor(@Inject(LvApiService) private lvApiService: LvApiService) { }
       
    ngOnInit(){
        //http://localhost:3000/api/my_lionel/items-for-filter
        let query: Array<string> = [];
        query.push('my_lionel');
        query.push('items-for-filter');

        this.lvApiService.get(query).subscribe(data => {
            
            this.myLionelItems = data;
        });
    }
    
    ngOnChanges(_) {
//console.log('this.lionelTofound',this.lionelTofound)
        if (this.lionelTofound) {
            
            this.index = null;
            this.myLionelItemsFiltered =
                TypeaheadUtils.filterTypeahead(this.myLionelItems, 'ext_lionel_id', this.lionelTofound).slice(0, 10);
        }
    }
    
    public reset():void{
        
        if(this.index !== null){
            this.myLionelItemsFiltered[this.index].active = false;
        }
        
        this.index = null;
        this.myLionelItemsFiltered = [];
    }
    
    public update():void{
      
      this.ngOnInit();  
    };
    
    public next():any{
        
        if(this.myLionelItemsFiltered.length > 0){
            
            let lastInd = this.index;
             
            if(this.index === null || this.index + 1 === this.myLionelItemsFiltered.length){
                this.index = 0;
                lastInd = this.myLionelItemsFiltered.length - 1;
            } else {
                this.index++;
            }
                
            this.myLionelItemsFiltered[lastInd].active = false;
            this.myLionelItemsFiltered[this.index].active = true;
            
            return this.myLionelItemsFiltered[this.index];
        }
        
        return null;
    }
}