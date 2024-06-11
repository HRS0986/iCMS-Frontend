import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import {AddRoleService} from "../../../shared-services/add-role.service";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import { MessageService } from 'primeng/api';
import {RoleRefreshService} from "../../../../app-settings/services/role-refresh.service";


@Component({
  selector: 'app-add-role-bar',
  templateUrl: './add-role-bar.component.html',
  styleUrls: ['./add-role-bar.component.scss']
})
export class AddRoleBarComponent implements OnInit {
  sidebarVisible!: boolean;
  formGroup!: FormGroup;

  //sample permissions
  permissions = [
    {name: 'View Users', value: false},
    {name: 'Edit Users', value: false},
    {name: 'Delete Users', value: false},
    {name: 'View Roles', value: false},
    {name: 'Edit Roles', value: false},
    {name: 'Delete Roles', value: false},
    {name: 'View Permissions', value: false},
    {name: 'Edit Permissions', value: false},
    {name: 'Delete Permissions', value: false},
    {name: 'View Products', value: false},
    {name: 'Edit Products', value: false},
    {name: 'Delete Products', value: false},
    {name: 'View Reports', value: false},
    {name: 'View Dashboard', value: false},
    {name: 'View Settings', value: false},
    {name: 'Edit Settings', value: false},
    {name: 'Delete Settings', value: false},
  ];
  roleName: any;

  constructor(
    private authService: AuthenticationService,
    private addRoleService: AddRoleService,
    private messageService: MessageService,
    private roleRefreshService: RoleRefreshService,
  ) {


  }

  ngOnInit(): void {

  }

  saveRole() {

    //after complting reload the page
    this.authService.getIdToken().subscribe((token: any) => {
      this.addRoleService.addRole(this.roleName, this.permissions, token).subscribe((data: any) => {
        console.log(data);
        // window.location.reload();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Role Added Successfully'});
        this.roleRefreshService.roleAdded.next();
      });
    });

  }


}
