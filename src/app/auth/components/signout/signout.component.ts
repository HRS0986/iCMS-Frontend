import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss'
})
export class SignoutComponent implements OnInit{

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.OnSignOut();
  }
  
  OnSignOut(): void {
    this.authService.signOut();
    this.router.navigate(['/auth/signin']);
  }

}
