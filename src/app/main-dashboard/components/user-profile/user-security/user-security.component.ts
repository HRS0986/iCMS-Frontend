import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrl: './user-security.component.scss'
})
export class UserSecurityComponent {
  @Output() sendDataToParent: EventEmitter<any> = new EventEmitter<any>();
  currentTab: string = "Security";
  sendDataToParentMethod(dataToSend: any) {
    this.sendDataToParent.emit(dataToSend);
  }
}
