import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedfucntionsService {

  showDialogEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  triggerShowDialog() {
    this.showDialogEvent.emit();
  }
}
