import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @Input('appDropdown') parentRef!: ElementRef;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const rect = this.parentRef.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (Math.abs(windowHeight - rect.y) < 250) {
      this.el.nativeElement.style.cssText = `
        bottom: 75%
      `;
    } else {
      this.el.nativeElement.style.cssText = `
      top: 110%
    `;
    }
  }
}
