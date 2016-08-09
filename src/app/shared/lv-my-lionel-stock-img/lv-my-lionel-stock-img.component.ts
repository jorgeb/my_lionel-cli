import { Component,
    OnInit,
    Inject,
    ChangeDetectorRef,
    AfterViewInit,
    ViewChild,
    Output,
    EventEmitter} from '@angular/core';

import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
// todo: change to ng2-bootstrap
import {ModalDirective, MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

import { LV_CAROUSEL_DIRECTIVES, LvCarouselComponent } from './lv-carousel.component';
import { LvApiService, LvApiServiceProviders } from '../lv-api/lv-api.service';

@Component({
    moduleId: module.id,
    selector: 'lv-my-lionel-stock-img',
    templateUrl: 'lv-my-lionel-stock-img.html',
    styleUrls: ['css/lv-my-lionel-stock-img.css'],
    viewProviders:[BS_VIEW_PROVIDERS],
    directives: [LV_CAROUSEL_DIRECTIVES, TAB_DIRECTIVES, MODAL_DIRECTVES]
})
export class LvMyLionelStockImgComponent implements OnInit, AfterViewInit {

    @Output()
    onNewImage: EventEmitter<any> = new EventEmitter();

    @ViewChild(LvCarouselComponent) lvCarouselComponent:LvCarouselComponent;
    @ViewChild('lgModal') lgModal:ModalDirective;
 
    private noProcessed: Array<any> = [];
    private allNoProcessed: Array<any> = [];

    private itemsBytab: number = 25;
    private dataTabs: Array<any> = [];
    private currentImgTab: any;
    
    private modal:any = {img:null};
    
    constructor( @Inject(LvApiService) private lvApiService: LvApiService,
        private _changeDetectionRef: ChangeDetectorRef) { }

    ngAfterViewInit(): void {

    }

    ngOnInit() {
        //http://localhost:3000/api/my_lionel/process-images
        let query: Array<string> = [];
        query.push('my_lionel');
        query.push('process-images');

        this.lvApiService.get(query).subscribe(data => {

            this.allNoProcessed = data.noProcessed.map(img => {

                return { img: img, active: false };
            });

            this.getDataTabs(this.allNoProcessed);

            this.noProcessed = this.allNoProcessed.slice(0, this.itemsBytab);

            /*        this.noProcessed[4].active = true;
            this._changeDetectionRef.detectChanges();*/
        });

    };

    private getDataTabs = (data) => {

        let tabs = (data.length / this.itemsBytab) | 0;
        this.dataTabs = [];

        for (let i = 0; i < tabs; i++) {
            this.dataTabs.push({
                label: `${(i * this.itemsBytab) + 1} - ${(i + 1) * this.itemsBytab}`,
                from: (i * this.itemsBytab) + 1,
                to: (i + 1) * this.itemsBytab,
                active: false,
                index: i
            });
        }

        let rest = data.length % this.itemsBytab;

        if (rest != 0)
            this.dataTabs.push({
                label: `${(tabs * this.itemsBytab) + 1} - ${(tabs * this.itemsBytab) + rest}`,
                from: (tabs * this.itemsBytab) + 1,
                to: (tabs * this.itemsBytab) + rest,
                active: false,
                index: tabs
            });

        this.currentImgTab = this.dataTabs[0];
        this.currentImgTab.active = true;
    };

    private selectImgs = (dataTab) => {

        this.currentImgTab.active = false;
        this.currentImgTab = dataTab;
        this.currentImgTab.active = true;
        this.noProcessed = this.allNoProcessed.slice(dataTab.from - 1, dataTab.to);
    };

    private onBeginWrap = ($event) => {

        if (this.currentImgTab.index === (this.dataTabs.length - 1)) {
            return;
        }

        this.currentImgTab.active = false;

        this.currentImgTab = this.dataTabs[this.currentImgTab.index + 1];
        this.currentImgTab.active = true;
        this.noProcessed = this.allNoProcessed.slice(this.currentImgTab.from - 1, this.currentImgTab.to);
        this._changeDetectionRef.detectChanges();
    }

    private onEndWrap = ($event) => {

        if (this.currentImgTab.index === 0) {
            return;
        }

        this.currentImgTab.active = false;

        this.currentImgTab = this.dataTabs[this.currentImgTab.index - 1];
        this.currentImgTab.active = true;
        this.noProcessed = this.allNoProcessed.slice(this.currentImgTab.from - 1, this.currentImgTab.to);
        
        this.noProcessed[this.noProcessed.length - 1].active = true;
        this._changeDetectionRef.detectChanges();
    }
    
    private onNewSlide = ($event) => {
        
        this.onNewImage.emit($event);
        //itemData.img
    }
    
    private showModal = (item) => {
        
        this.modal = item;
        this.lgModal.show();
    };

    public NextImage = () => {
        
        this.lvCarouselComponent.next();
    }
}