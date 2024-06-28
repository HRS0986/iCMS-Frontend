import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from './authorization.component.data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization-message',
  templateUrl: './authorization-message.component.html',
  styleUrl: './authorization-message.component.scss'
})
export class AuthorizationMessageComponent implements OnInit{

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Authorization Request"}
  ];

  need_to_authorize: boolean = false
  needToAuthorizeAddress: string  = "mygmail@.gmail.com"
  authorization_url!: string

  authorizationInfoLoading: boolean = true


  constructor(private dataService:DataService, private http:HttpClient, private router: Router){}
  
  redirectToURI() {
    
    // only perform the activation of aithroze button after the authrozation uri is loaded from the backend
    if (!this.authorizationInfoLoading){
      console.log("authorization url", this.authorization_url)
      window.location.href = this.authorization_url
      console.log(this.authorization_url)
    }
   
  }




  ngOnInit(): void {

    type dict = { [key: string]: any };
    this.dataService.getAuthorizationInfo().subscribe((data: dict) => {
      console.log("data for authroization ", data)
 

      this.need_to_authorize = data["needToAuthorize"]
      this.needToAuthorizeAddress = data["needToAuthorizeAddress"]
      this.authorization_url = data["authorization_url"]
      
      this.authorizationInfoLoading = false
       

      // redirect back to dashboard when the user authorzie it
      if(!this.need_to_authorize){
        this.router.navigate(['/email/dashboard1']);
      }
  
         
     });
    
  }

}
