import { Injectable } from '@angular/core';
import { Subject, switchMap, of, filter, toArray } from 'rxjs';
import { Option } from './select/select.component';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  selectOption = new Subject<Option>();

  constructor() {}

  displayOptions(options: Option[]) {
    return this.selectOption.pipe(
      switchMap((selectedOption) =>
        of(...options).pipe(
          filter((option) => option.id !== selectedOption.id),
          toArray()
        )
      )
    );
  }
}
