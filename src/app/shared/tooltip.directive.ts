import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnChanges {
  @Input('appTooltip') tooltipContent!: string;

  public tippyInstance: any;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.tippyInstance = tippy(this.elRef.nativeElement, {
      content: this.tooltipContent,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tooltipContent']) {
      //content has changed
      this.updateTooltipContent();
    }
  }

  updateTooltipContent() {
    if (this.tippyInstance) {
      this.tippyInstance.setContent(this.tooltipContent);
    }
  }
}
