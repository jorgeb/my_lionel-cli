
import { Component,
    OnInit,
    OnChanges,
    Input} from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'lv-my-lionel-current-img',
    templateUrl: 'lv-my-lionel-current-img.html',
    styleUrls: ['css/lv-my-lionel-current-img.css'],
    //directives: [BUTTON_DIRECTIVES, LV_CAROUSEL_DIRECTIVES]
})
export class LvMyLionelCurrentImg implements OnInit, OnChanges {
    
    @Input()
    currentItem:any;    
       
    constructor() { }
       
    ngOnInit(){
    }
    
    ngOnChanges(_) {
    }
}