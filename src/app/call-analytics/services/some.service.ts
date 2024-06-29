import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SomeService {
  constructor() { }

  getSomeValue(): string {
    return 'someValue';
  }
}
