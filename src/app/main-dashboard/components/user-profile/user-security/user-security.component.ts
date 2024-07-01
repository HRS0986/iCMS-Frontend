// user-security.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import  {AuthenticationService} from "../../../../auth/services/authentication.service";
import { CookieService } from 'ngx-cookie-service';
import { UserChangePasswordService } from '../../../services/user-change-password.service';
import {HttpClient} from "@angular/common/http";
import { MessageService } from 'primeng/api';


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

constructor(
  private http:HttpClient ,
  private authService: AuthenticationService,
  private cookieService:CookieService,
  private changePasswordService: UserChangePasswordService,
  private messageService: MessageService
) { }

  sendDataToParentMethod(dataToSend: any) {
    this.sendDataToParent.emit(dataToSend);
  }
  changePassword(){
    if(this.newPassword === this.confirmPassword){
      if(this.newPassword.length >= 8){
        this.authService.getIdToken().subscribe((token: any) => {
          console.log(token);
          this.changePasswordService.changePassword(token, this.currentPassword, this.newPassword).subscribe((data: any) => {
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Password changed successfully'});
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
          }, (error: any) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error changing password'});
          });
        });
      } else {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Password must be at least 8 characters long'});
      }
    }else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Passwords do not match'});
    }
  }


}
