// user-security.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import  {AuthenticationService} from "../../../../auth/services/authentication.service";
import { CookieService } from 'ngx-cookie-service';
import { UserChangePasswordService } from '../../../services/user-change-password.service';
import {HttpClient} from "@angular/common/http";

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

  constructor(private http:HttpClient ,private authService: AuthenticationService, private cookieService:CookieService,  private changePasswordService: UserChangePasswordService) { }

  sendDataToParentMethod(dataToSend: any) {
    this.sendDataToParent.emit(dataToSend);
  }

  changePassword(){

    if(this.newPassword === this.confirmPassword){
      this.authService.getIdToken().subscribe((token: any) => {
        console.log(token);
        this.changePasswordService.changePassword(token, this.currentPassword, this.newPassword).subscribe((data: any) => {
          console.log(data);
        });
      });
    }
  }


}
