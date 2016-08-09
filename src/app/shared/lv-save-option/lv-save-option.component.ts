
import { Component,
    OnInit,
    Input,
    Inject,
    ChangeDetectorRef} from '@angular/core';

import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { LV_CAROUSEL_DIRECTIVES } from '../../shared/lv-my-lionel-stock-img/lv-carousel.component';
import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

export enum SaveTypes {
    Lionel,Box
}
export enum ActionTypes {
    New,Add,Asc,Del,Skip
}

export class LvSaveOptions  {
    
    public type:SaveTypes = SaveTypes.Lionel;
    public action:ActionTypes = ActionTypes.New;
    public boxId:number = null;
}

@Component({
    moduleId: module.id,
    selector: 'lv-save-option',
    templateUrl: 'lv-save-option.html',
    //styleUrls: ['css/lv-save-option.css'],
    directives: [BUTTON_DIRECTIVES, LV_CAROUSEL_DIRECTIVES]
})
export class LvSaveOptionComponent implements OnInit {
    
    @Input()
    options:LvSaveOptions;
    
    private saveTypes = SaveTypes;
    private actionTypes = ActionTypes;
    private myBoxes:Array<any> = [];

    constructor(@Inject(LvApiService) private lvApiService: LvApiService,
        private _changeDetectionRef: ChangeDetectorRef) { }
       
    ngOnInit(){
        //http://localhost:3000/api/my_lionel/boxes
        let query: Array<string> = [];
        query.push('my_lionel');
        query.push('boxes');

        this.lvApiService.get(query).subscribe(data => {
            
            data = data.map( box => {
                box['active'] = false;
                
                return box;    
            });
            
            if(data.length > 0){
                data[data.length - 1].active = true;
            }
            
            this.myBoxes = data;
            
            this._changeDetectionRef.detectChanges();
        });

    }
    
    private onNewSlide = ($event) => {
        
        this.options.boxId = $event.itemData.id;
    }
    
    public update = () => {
        
        this.ngOnInit();
    }
}