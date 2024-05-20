import { Component, OnInit } from '@angular/core';
import { AuthendicationService } from '../../../services/authendication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: { username: string; email: string; phone: string; password: string; profileImage: string } = {
    username: "John Doe",
    email: "jafda@gmail.com",
    phone: "1234567890",
    password: "password",
    profileImage: "assets/images/avatars/avatar.jpg"
  };

  username: string = this.user.username;
  email: string = this.user.email;
  phone: string = this.user.phone;
  
  constructor(private authService: AuthendicationService) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }


  fetchUserDetails(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Call the AuthService method to fetch user details
      this.authService.userDetails(token).subscribe(
        (response) => {
          this.username = response[0].username;
          this.email = response[0].email;
          this.phone = response[0].contact;
          this.user = response; // Store user details in component variable
        },
      );
    } else {
      
    }
  }


  changeUserDetails() {
    const profileUpdateData = {
      "username": this.username,
      "email": this.email,
      "contact": this.phone
    };
    

    console.log("Profile update data:", profileUpdateData);
    this.authService.profileUpdate(profileUpdateData, localStorage.getItem('token') || '').subscribe(
      (response) => {

      },
    );

  }
  
}
