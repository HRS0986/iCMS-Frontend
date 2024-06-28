import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import { MessageService } from 'primeng/api';
import {RoleSettingsService} from "../../../../app-settings/services/role-settings.service";
import {UserRefreshService} from "../../../../app-settings/services/user-refresh.service";
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {UserUpdateService} from "../../../../app-settings/services/user-update.service";


@Component({
  selector: 'app-add-member-bar',
  templateUrl: './add-member-bar.component.html',
  styleUrl: './add-member-bar.component.scss'
})
export class AddMemberBarComponent implements OnInit{
  sidebarVisible: boolean;
  isUpdate: boolean = false;

    userName!:string;
    password!:string;
    email!:string;
    phoneNumber!:string;

    roles: {group_name:string, number_of_users:number}[] = []
    selectedRoles!: { group_name: string, number_of_users: number }[];

    constructor(
      private authService: AuthenticationService,
      private roleService: RoleSettingsService,
      private messageService: MessageService,
      private userRefreshService: UserRefreshService,
      private userUpdateService: UserUpdateService
    ) {
      this.sidebarVisible = false;
    }

    ngOnInit() {
      this.userUpdateService.userToUpdate.subscribe((userData: any) => {
        this.populateForm(userData);
      });
    }

    addUser() {
      this.authService.getIdToken().pipe(
        catchError(error => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to get token'});
          return of(null);
        })
      ).subscribe(token => {
        if (token) {
          this.roleService.addUser(token, this.userName, this.password, this.email, this.phoneNumber, this.selectedRoles).pipe(
            catchError(error => {
              this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add user'});
              return of(null);
            })
          ).subscribe((data: any) => {
            if (data) {
              console.log(data);
              this.messageService.add({severity:'success', summary:'Success', detail:'User added successfully'});
              this.userRefreshService.userAdded.next()
              this.sidebarVisible = false;
              //clear the form
              this.userName = '';
              this.password = '';
              this.email = '';
              this.phoneNumber = '';
              this.selectedRoles = [];
            }
          });
        }
      });
    }
    populateForm(userData: any) {
      this.isUpdate = true;
      this.userName = userData.Username;
      this.email = userData.UserAttributes.find((attr: any) => attr.Name === 'email')?.Value || '';
      this.phoneNumber = userData.UserAttributes.find((attr: any) => attr.Name === 'custom:phone_number')?.Value || '';
      this.selectedRoles = userData.roles;
      this.sidebarVisible = true;
      this.password= '0000000000000'
    }

    getRoles() {
      this.authService.getIdToken().subscribe(token => {
        this.roleService.getUserRoles(token).subscribe((data: any) => {
          this.roles = data;
        });
      });
    }

    saveUpdateUser() {
      // Logic for updating the user goes here
      console.log('Updating user...');

      this.authService.getIdToken().pipe(
        catchError(error => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to get token'});
          return of(null);
        })
      ).subscribe(token => {
        if (token) {
          this.roleService.updateUser(token, this.userName, this.email, this.phoneNumber, this.selectedRoles).pipe(
            catchError(error => {
              this.messageService.add({severity:'error', summary:'Error', detail:'Failed to update user'});
              return of(null);
            })
          ).subscribe((data: any) => {
            if (data) {
              console.log(data);
              this.messageService.add({severity:'success', summary:'Success', detail:'User updated successfully'});
              this.userRefreshService.userUpdated.next();
              this.sidebarVisible = false;
              //clear the form
              this.resetData();
            }
          });
        }
      });


      this.password = '';
    }


  resetData() {
    this.userName = '';
    this.password = '';
    this.email = '';
    this.phoneNumber = '';
    this.selectedRoles = [];
    this.sidebarVisible = true;
  }
}
