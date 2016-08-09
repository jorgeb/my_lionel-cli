import { Component,
    OnInit,
    Inject,
    Output,
    EventEmitter,
    ViewChild} from '@angular/core';

import { TYPEAHEAD_DIRECTIVES, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { TypeaheadUtils } from './typeahead-utils';
import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';
import { LvMyLionelItems } from '../lv-my-lionel-items/lv-my-lionel-items.component';

@Component({
    moduleId: module.id,
    selector: 'lv-lionel-filter',
    templateUrl: 'lv-lionel-filter.html',
    styleUrls: ['css/lv-lionel-filter.css'],
    directives: [TYPEAHEAD_DIRECTIVES, TOOLTIP_DIRECTIVES, LvMyLionelItems],
    providers: []
})
export class LvLionelFilterComponent implements OnInit {

    @Output() 
    onSelected: EventEmitter<any> = new EventEmitter();

    @Output() 
    onTypeKeyChange: EventEmitter<any> = new EventEmitter();

    @Output() 
    onActionKeyChange: EventEmitter<any> = new EventEmitter();

    @Output() 
    onBoxKeyChange: EventEmitter<any> = new EventEmitter();
/*
    @Output() 
    onItemKeyChange: EventEmitter<any> = new EventEmitter();
*/    
    @ViewChild('my_input') input;
    @ViewChild(LvMyLionelItems) lvMyLionelItems:LvMyLionelItems;
    
    private lionelItems: Array<any> = [];
    private lionelItemsFilter: Array<any> = [];
    private myLionelExisten:any;
    private selected: string = '';
    
    private typing: string;
    private typeaheadLoading: boolean = false;
    private typeaheadNoResults: boolean = false;
        
    constructor( @Inject(LvApiService) private lvApiService: LvApiService) { }

    ngOnInit() {
        
        let query: Array<string> = [];
        query.push('lionel');
        query.push('auto-complete');

        this.lvApiService.get(query).subscribe(data => {
            this.lionelItems = data;
        });
        
    };

    private changeTypeaheadLoading = (e: boolean): void => {
        this.typeaheadLoading = e;
    }

    private changeTypeaheadNoResults = (e: boolean): void => {
        this.typeaheadNoResults = e;
    }

    private typeaheadOnSelect = (e: any): void => {
        
        let li = this.input.nativeElement;
         
        li.setSelectionRange(0, li.value.length);
               
        e.myLionelExisten = Object.assign({},this.myLionelExisten);
        
        this.lvMyLionelItems.reset();
        this.myLionelExisten = null;
 
        this.onSelected.emit(e);
    }
    
    private onChange = (event) => {
        
        this.typing = event;
        this.lionelItemsFilter =
            TypeaheadUtils.filterTypeahead(this.lionelItems,'lionel_id',event).slice(0, 10); 
       
    };
    
    private onMouseEnter = (item) => {
        
        item.showImage = true;
    }

    private onMouseLeave = (item) => {
        
        item.showImage = false;
    }
    
    private handleKeyEvent = ($event) => {
        
        if ($event.keyCode === 84){
            this.onTypeKeyChange.emit($event);
        }

        if ($event.keyCode === 65){
            this.onActionKeyChange.emit($event);
        }

        if ($event.keyCode === 66){
            this.onBoxKeyChange.emit($event);
        }
        
        if ($event.keyCode === 73){
            this.updateNextMyItem();
        }        
        
    }
    
    private updateNextMyItem(){
        
        this.myLionelExisten = Object.assign({},this.lvMyLionelItems.next());
    }
    
    public updateMyLionelItems = ():void => {
        
        this.lvMyLionelItems.update();
    }
}

