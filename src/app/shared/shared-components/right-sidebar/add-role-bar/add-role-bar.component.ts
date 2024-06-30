import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import {AddRoleService} from "../../../shared-services/add-role.service";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import { MessageService } from 'primeng/api';
import {RoleRefreshService} from "../../../../app-settings/services/role-refresh.service";
import {UserDataService} from "../../../../app-settings/services/user-data.service";
import {RoleUpdateService} from "../../../../app-settings/services/role-update.service";


@Component({
  selector: 'app-add-role-bar',
  templateUrl: './add-role-bar.component.html',
  styleUrls: ['./add-role-bar.component.scss']
})
export class AddRoleBarComponent implements OnInit {
  isRoleUpdate: boolean = false;
  sidebarVisible!: boolean;
  formGroup!: FormGroup;
  permissions: {name: string, value: boolean}[] = [];

  //sample permissions

  roleName: any;

  users!: {user_name:string}[];
  selectedUsers!: {user_name:string}[];

  user_permissions: string[] = [];


  constructor(
    private authService: AuthenticationService,
    private addRoleService: AddRoleService,
    private messageService: MessageService,
    private roleRefreshService: RoleRefreshService,
    private userDataService: UserDataService,
    private roleUpdateService: RoleUpdateService
  ) {


  }

  ngOnInit(): void {
    this.permissions = [
      {name: 'Add User', value: false},
      {name: 'View Users', value: false},
      {name: 'View User', value: false},
      {name: 'Edit User', value: false},
      {name: 'Delete User', value: false},
      {name: 'Enable User', value: false},
      {name: 'Disable User', value: false},
      {name: 'Add Role', value: false},
      {name: 'View Roles', value: false},
      {name: 'View Role', value: false},
      {name: 'Edit Role', value: false},
      {name: 'Delete Role', value: false},
      {name: 'Edit Config', value: false},
      {name: 'View Config', value: false},
      {name:'Add Call Recording', value: false},
      {name:'View Call Recordings', value: false},
      {name:'Delete Call Recordings', value: false},
      {name:'Edit Call Recordings', value: false},
      {name:'Add Call Operator', value: false},
      {name:'View Call Operators', value: false},
      {name:'Delete Call Operator', value: false},
      {name:'Edit Call Operator', value: false},
      {name:'View Call Details', value: false},
      {name:'View Analytics', value: false},
      {name:'Filter Calls', value: false},
      {name:'Change Call Settings', value: false},
    ];
    this.roleUpdateService.roleToUpdate.subscribe((roleData: any) => {
      this.populateForm(roleData);
    });

    this.authService.permissions$.subscribe((permissions: string[]) => {
      this.user_permissions = permissions;
    });

  }

  saveRole() {

    //after complting reload the page
    this.authService.getIdToken().subscribe((token: any) => {
      this.addRoleService.addRole(this.roleName, this.permissions, this.selectedUsers, token).subscribe((data: any) => {
        console.log(data);
        // window.location.reload();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Role Added Successfully'});
        this.roleRefreshService.roleAdded.next();
      });
    });



  }


  getUsers() {
    this.authService.getIdToken().subscribe((token: any) => {
      this.userDataService.getUsersNames(token).subscribe((data: any) => {
        this.users = data;
        console.log(this.users)
      });
    });

  }
  populateForm(roleData: any) {
    this.isRoleUpdate = true;
    this.roleName = roleData.Group.GroupName;
    this.permissions = roleData.Group.Permissions.map((permission: any) => {
      return {name: permission.Name, value: permission.Value === 'true'};
    });
    this.selectedUsers = roleData.Group.Users;
    this.sidebarVisible = true;
  }

  saveUpdateRole() {
    let roleData = {
      group_name: this.roleName,
      permissions: this.permissions
    }
    // Logic for updating the role goes here
    this.authService.getIdToken().subscribe((token: any) => {
      this.roleUpdateService.updateRole(token, roleData).subscribe((data: any) => {
        console.log(data);
        // window.location.reload();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Role Updated Successfully'});
        this.roleRefreshService.roleAdded.next();
        this.isRoleUpdate = false;
      });
    });
  }

  resetData() {

    this.permissions = [
      {name: 'Add User', value: false},
      {name: 'View Users', value: false},
      {name: 'View User', value: false},
      {name: 'Edit User', value: false},
      {name: 'Delete User', value: false},
      {name: 'Enable User', value: false},
      {name: 'Disable User', value: false},
      {name: 'Add Role', value: false},
      {name: 'View Roles', value: false},
      {name: 'View Role', value: false},
      {name: 'Edit Role', value: false},
      {name: 'Delete Role', value: false},
      {name: 'Edit Config', value: false},
      {name: 'View Config', value: false},
      {name:'Add Call Recording', value: false},
      {name:'View Call Recordings', value: false},
      {name:'Delete Call Recordings', value: false},
      {name:'Edit Call Recordings', value: false},
      {name:'Add Call Operator', value: false},
      {name:'View Call Operators', value: false},
      {name:'Delete Call Operator', value: false},
      {name:'Edit Call Operator', value: false},
      {name:'View Call Details', value: false},
      {name:'View Analytics', value: false},
      {name:'Filter Calls', value: false},
      {name:'Change Call Settings', value: false},
    ];
    this.roleName = '';
    this.selectedUsers = [];
    this.sidebarVisible = true;
    this.isRoleUpdate = false;

  }

  hasPermission(permission: string): boolean {
    return this.user_permissions.includes(permission);
  }
}
