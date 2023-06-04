import { Component, ElementRef } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { SelectService } from '../select.service';
import { FormGroup, FormControl } from '@angular/forms';
import { of, filter, toArray } from 'rxjs';

export interface Option {
  id: number;
  label: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() label = '';
  @Input() options: Option[] = [];
  @Input() placeholder = '';
  @Input() value!: string;

  @Output() change = new EventEmitter();

  queryForm = new FormGroup({
    query: new FormControl(''),
  });

  showOptions = false;

  constructor(private selectService: SelectService, public el: ElementRef) {}

  ngOnInit() {
    document.body.addEventListener('click', this.hideOptions);

    const parent = this.el.nativeElement.parentElement;

    const childNodes = [...parent.childNodes];

    childNodes.forEach((childNode: Element) => {
      if (childNode !== this.el.nativeElement) {
        childNode.childNodes[0]?.addEventListener('click', this.hideOptions);
      }
    });

    parent.addEventListener('DOMNodeInserted', (childNode: any) => {
      if (
        childNode.relatedNode?.className === 'grid-four' &&
        childNode.srcElement.nodeName !== '#comment'
      ) {
        childNode.srcElement.firstChild.addEventListener(
          'click',
          this.hideOptions
        );
      }
    });

    this.change.subscribe((option) => {
      this.selectService.selectOption.next(option);
      this.queryForm.controls.query.setValue('');
    });

    this.queryForm.get('query')?.valueChanges.subscribe((value) => {
      if (value) this.filteredOptions();
    });

    this.selectService
      .displayOptions(this.options)
      .subscribe((displayableOptions) => {
        this.options = displayableOptions;
      });
  }

  getQuery() {
    return this.queryForm.controls.query.value || '';
  }

  filteredOptions() {
    return of(...this.options).pipe(
      filter((option) =>
        option.label.toLowerCase().includes(this.getQuery().toLowerCase())
      ),
      toArray()
    );
  }

  hideOptions = () => {
    this.showOptions = false;
  };

  onChange(option: Option) {
    this.change.emit(option);
  }

  handleClick(event: Event) {
    event.stopPropagation();
    this.showOptions = !this.showOptions;
  }

  ngOnDestroy() {
    document.body.removeEventListener('click', this.hideOptions);
    this.el.nativeElement.parentElement.childNodes.forEach(
      (childNode: Element) => {
        if (childNode !== this.el.nativeElement) {
          childNode.childNodes[0]?.removeEventListener(
            'click',
            this.hideOptions
          );
        }
      }
    );
  }
}
