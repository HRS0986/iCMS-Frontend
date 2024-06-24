import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ProfileSettingsService } from "../../../../app-settings/services/profile-settings.service";
import  {AuthenticationService} from "../../../../auth/services/authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserProfileDataService} from "../../../services/user-profile-data.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  username: string = '';
  email: string = ''
  phone: string = ''
  profileImage: string = ''
  timestamp!: number;

  constructor(private http: HttpClient,private authService: AuthenticationService, private profileService: ProfileSettingsService, private userProfileDataService: UserProfileDataService) { }


  // @ViewChild('fileUploader') fileUploader: any;

  @ViewChild('fileInput') fileInput!: ElementRef;


  selectedFile: File | null = null;


  ngOnInit(): void {
    // this.userProfileDataService.getUserProfileData()
    // this.fetchUserDetails();

    this.timestamp = Date.now();

    this.authService.getIdToken().subscribe((token: any) => {
      this.userProfileDataService.getUserProfileData(token).subscribe((data: any) => {
        console.log(data)
        this.username = data[0].Value;
        this.email = data[0].Value;
        this.phone = data[2].Value;
        this.profileImage = data[4].Value;
      });
    });
  }


  // fetchUserDetails(): void {
  //   const token = this.cookieService.get('token');
  //   if (token) {
  //     // Call the AuthService method to fetch user details
  //     this.authService.userDetails(token).subscribe(
  //       (response) => {
  //         this.username = response[0].username;
  //         this.email = response[0].email;
  //         this.phone = response[0].contact;
  //         this.user = response; // Store user details in component variable
  //       },
  //     );
  //   } else {
  //
  //   }
  // }


  // changeUserDetails() {
  //   const profileUpdateData = {
  //     "username": this.username,
  //     "email": this.email,
  //     "contact": this.phone
  //   };
  //
  //
  //   console.log("Profile update data:", profileUpdateData);
  //   this.authService.profileUpdate(profileUpdateData, this.cookieService.get('token')).subscribe(
  //     (response) => {
  //
  //     },
  //   );
  //
  //
  // }


  //janith
  openFileUpload() {
    this.fileInput.nativeElement.click();
  }




  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      let headers = new HttpHeaders();
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.authService.getIdToken().subscribe((token: any) => {
        headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      });
      this.http.post('http://localhost:8000/uploadProfileImage', formData, { headers })
        .subscribe((response: any) => {
          console.log(response);
          window.location.reload();
        }, (error: any) => {
          console.error(error);
        });
    }
  }

  getProfileImageUrl() {
    return `${this.profileImage}?${this.timestamp}`;
  }


}
