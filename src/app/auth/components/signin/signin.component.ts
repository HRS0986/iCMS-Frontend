// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  username: string = "";
  password: string = "";
  Image = {
    image: '/assets/Strategic consulting-pana 1.png'
  }

  constructor(private authService: AuthenticationService, private router: Router) {}

  // signIn(): void {
  //   this.authService.signIn(this.username, this.password)
  //     .then(() => {
  //
  //
  //       console.log('Sign in successful');
  //       console.log('User:', this.authService.getUser());
  //       console.log('User details:', this.authService.getUserDetails());
  //       console.log("devices", this.authService.getAllDevices());
  //
  //       this.router.navigate(['/']);
  //
  //
  //     })
  //     .catch((error: any) => {
  //       console.error('Sign in error:', error);
  //     });
  // }

  signIn(): void {
    this.authService.signIn(this.username, this.password)
      .subscribe({
        next: (session) => {
          console.log('Logged in successfully', session);
          localStorage.setItem('idToken',session.idToken.jwtToken);
          // Redirect or perform actions after successful login
          this.router.navigate(['/']).then(r => console.log('Navigated to home'));
        },
        error: (error) => {
          console.error('Error during login', error);
          // Handle login error
        }
      });
  }
}
