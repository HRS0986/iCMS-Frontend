// user-security.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthendicationService } from '../../../services/authendication.service';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss']
})
export class UserSecurityComponent {
  @Output() sendDataToParent: EventEmitter<any> = new EventEmitter<any>();

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthendicationService) { }

  sendDataToParentMethod(dataToSend: any) {
    this.sendDataToParent.emit(dataToSend);
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      return;
    }

    const changePasswordData = {
      "currentPassword": this.currentPassword,
      "password": this.newPassword,
      "conpassword": this.confirmPassword
    };

    const token = localStorage.getItem('token') || '';
    this.authService.changePassword(changePasswordData, token).subscribe(
      (response) => {
      }
    );
  }
}
