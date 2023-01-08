import {
  AfterViewInit,
  ContentChildren,
  Directive,
  QueryList,
} from '@angular/core';
import { createSingleton } from 'tippy.js';
import { TooltipDirective } from './tooltip.directive';

@Directive({
  selector: '[appToolTipSingleton]',
})
export class ToolTipSingletonDirective implements AfterViewInit {
  @ContentChildren(TooltipDirective, { descendants: true })
  elementsWithTooltips!: QueryList<TooltipDirective>;

  singletonInstance: any;

  constructor() {}

  ngAfterViewInit() {
    this.singletonInstance = createSingleton(this.getTippyInstance(), {
      delay: [200, 0],
      moveTransition: 'transform 0.2s ease-out ',
    });

    this.elementsWithTooltips.changes.subscribe(() => {
      this.singletonInstance.setInstances(this.getTippyInstance());
    });
  }

  getTippyInstance() {
    return this.elementsWithTooltips.toArray().map((t) => t.tippyInstance);
  }
}
