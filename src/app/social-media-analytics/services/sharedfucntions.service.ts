import { Injectable } from '@angular/core';
import { socialMediaBackendAPI } from '../../app-settings/config';

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
