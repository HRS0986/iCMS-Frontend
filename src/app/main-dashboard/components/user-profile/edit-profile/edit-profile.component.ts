import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ImageModule} from "primeng/image";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  user: { username: string; email: string; phone: string; password: string; profileImage:string } = {
    username: "John Doe",
    email: "jafda@gmail.com",
    phone: "1234567890",
    password: "password",
    profileImage: "assets/images/avatars/avatar.jpg"
  };

  username: string = this.user.username;
  email: string = this.user.email;
  phone: string = this.user.phone;

  changeUserDetails() {
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.phone = this.phone;
  }


}


