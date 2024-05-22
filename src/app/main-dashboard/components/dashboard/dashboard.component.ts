import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import { AuthendicationService } from '../../services/authendication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  breadcrumbItems: MenuItem[] = [
    {label: "Main Dashboard"},
  ];
  myData = [
    {word: 'Prashant', weight: 40, color: 'green'},
    {word: 'Sandeep', weight: 39, color: 'green'},
    {word: 'Ajinkya', weight: 11, color: 'green'},
    {word: 'Kuldeep', weight: 36, color: 'green'},
    {word: 'Vivek', weight: 39},
    {word: 'Saheer', weight: 12, color: 'green'},
    {word: 'Lohit', weight: 27},
    {word: 'Anirudh', weight: 36},
    {word: 'Raj', weight: 22},
    {word: 'Mohan', weight: 40},
    {word: 'Yadav', weight: 39},
    {word: 'India', weight: 11, color: 'green'},
    {word: 'USA', weight: 27},
    {word: 'Sreekar', weight: 36},
    {word: 'Ram', weight: 39},
    {word: 'Deepali', weight: 12, color: 'green'},
    {word: 'Kunal', weight: 27},
    {word: 'Rishi', weight: 80},
    {word: 'Chintan', weight: 22}
  ]

  constructor(private authService: AuthendicationService) { }
  ngOnInit(): void {
    // this.loginAndFetchUserDetails();
  }

  loginAndFetchUserDetails(): void {
    const loginData: any = { "email": "Thenujan@gmail.com", "password": "Thenujan" };
    this.authService.login(loginData).subscribe(
      (response) => {
        localStorage.setItem('token', response.access_token);
      },
    );
  }
}
