import { Component,
    OnInit,
    Inject } from '@angular/core';

import { TYPEAHEAD_DIRECTIVES, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { TypeaheadUtils } from './typeahead-utils';
import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

@Component({
    moduleId: module.id,
    selector: 'lv-lionel-filter',
    templateUrl: 'lv-lionel-filter.html',
    directives: [TYPEAHEAD_DIRECTIVES, TOOLTIP_DIRECTIVES],
    providers: []
})
export class LvLionelFilterComponent implements OnInit {

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
        console.log(`Selected value`, e);
    }
    
    private onChange = (event) => {
        this.lionelItemsFilter =
            TypeaheadUtils.filterTypeahead(this.lionelItems,'lionel_id',event).slice(0, 10); 
        
        console.log(this.lionelItemsFilter);
    };
    /*
    private syncActions():void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap((value:string) => {
        let normalizedQuery = this.normalizeQuery(value);

        return Observable.from(this.typeahead)
          .filter((option:any) => {
            return option && this.testMatch(this.prepareOption(option).toLowerCase(), normalizedQuery);
          })
          .toArray();
      })
      .subscribe(
        (matches:string[]) => {
          this._matches = matches.slice(0, this.typeaheadOptionsLimit);
          this.finalizeAsyncCall();
        },
        (err:any) => {
          console.error(err);
        }
    );
  }*/

}
