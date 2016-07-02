import {Component, OnInit, OnDestroy, Input, HostBinding, Optional,Inject, forwardRef} from '@angular/core';
import {LvCarouselComponent, Direction} from './lv-carousel.component';

@Component({
  selector: 'lv-slide',
  template: `
    <div [class.active]="active" class="item text-center">
      <ng-content></ng-content>
    </div>
  `
})
export class LvSlideComponent implements OnInit, OnDestroy {
  @Input() public index:number;
  @Input() public direction:Direction;

  @HostBinding('class.active')
  @Input() public active:boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass:boolean = true;


  public constructor(
    @Inject(forwardRef(() => LvCarouselComponent)) private carousel:LvCarouselComponent) {}

  public ngOnInit():void {
    this.carousel.addSlide(this);
  }

  public ngOnDestroy():void {
    this.carousel.removeSlide(this);
  }
}