// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthenticationService } from "../../services/authentication.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });

  isSubmitted = false;

  Image = {
    image: '/assets/Strategic consulting-pana 1.png'
  }

  constructor(private authService: AuthenticationService, private router: Router) {}

  signIn(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
          next: (session) => {
            console.log('Logged in successfully', session);
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

  getEmailError() {
    if (this.isSubmitted) {
      if (this.loginForm.controls["email"].hasError('email')) {
        return "Please enter valid email address.";
      }
      if (this.loginForm.controls["email"].hasError('required')) {
        return "Email is required.";
      }
    }
    return "";
  }

  getPasswordError() {
    if (this.isSubmitted) {
      if (this.loginForm.controls["password"].hasError('required')) {
        return "Password is required.";
      }
    }
    return "";
  }
}
