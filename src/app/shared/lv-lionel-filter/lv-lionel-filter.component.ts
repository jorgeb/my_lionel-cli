import { Component,
    OnInit,
    Inject,
    Output,
    EventEmitter} from '@angular/core';

import { TYPEAHEAD_DIRECTIVES, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { TypeaheadUtils } from './typeahead-utils';
import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

@Component({
    moduleId: module.id,
    selector: 'lv-lionel-filter',
    templateUrl: 'lv-lionel-filter.html',
    styleUrls: ['css/lv-lionel-filter.css'],
    directives: [TYPEAHEAD_DIRECTIVES, TOOLTIP_DIRECTIVES],
    providers: []
})
export class LvLionelFilterComponent implements OnInit {

    @Output() 
    onSelected: EventEmitter<any> = new EventEmitter();
    
    private lionelItems: Array<any> = [];
    private lionelItemsFilter: Array<any> = [];
    
    private selected: string = '';
    private asyncSelected: string = '';
    private typeaheadLoading: boolean = false;
    private typeaheadNoResults: boolean = false;
    
    public htmlTooltip:string = 'I\'ve been made <b>bold</b>!';
    
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
        
        this.onSelected.emit(e);
    }
    
    private onChange = (event) => {
        this.lionelItemsFilter =
            TypeaheadUtils.filterTypeahead(this.lionelItems,'lionel_id',event).slice(0, 10); 
       
    };
    
    private onMouseEnter = (item) => {
        
        item.showImage = true;
    }

    private onMouseLeave = (item) => {
        
        item.showImage = false;
    }
    
}

