import { Component, OnInit } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { RoleSettingsService } from "../../services/role-settings.service"
import  {AuthenticationService} from "../../../auth/services/authentication.service";
import { RoleRefreshService } from "../../services/role-refresh.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import { Router} from "@angular/router";
import {CheckLoginService} from "../../../shared/shared-services/check-login.service";


@Component({
  selector: "app-role-management",
  templateUrl: "./role-management.component.html",
  styleUrl: "./role-management.component.scss",
})
export class RoleManagementComponent implements OnInit{

  breadcrumbItems: MenuItem[] = [
    { label: "App Settings" },
    { label: "Role Management" },
  ];

  roles: {group_name:string, number_of_users:number}[] = []
  selectedRoles!: { group_name: string, number_of_users: number };

  actions!: MenuItem[];

  constructor(
    private roleService: RoleSettingsService ,
    private authService: AuthenticationService,
    private roleRefreshService: RoleRefreshService,
    private messageService: MessageService,
    private router: Router,
    private checkLoginService: CheckLoginService
  ) {}


  ngOnInit() {

    this.checkLoginService.checkLogin();



    this.refreshRoles()
    this.roleRefreshService.roleAdded.subscribe(() => {
      this.refreshRoles();
    });

    //actions delete, update, view
    this.actions = [
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          console.log("Viewing role");
        }
      },
      { label: "Update",
        icon: "pi pi-pencil",
        command: () => {
          console.log("Updating role");
        }
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          console.log("Deleting role");
          this.deleteRole();
        }
      },
    ];

  }

  refreshRoles() {
    this.authService.getIdToken().subscribe((token: any) => {
      this.roleService.getUserRoles(token).subscribe((data: any) => {
        this.roles = data;
        console.log(this.roles);
      });
    });
  }

deleteRole() {
  this.authService.getIdToken().pipe(
    catchError(error => {
      if (error === 'Session expired. Please sign in again.') {
        this.router.navigate(['/auth/login']);
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to get token'});
      }
      return of(null);
    })
  ).subscribe(token => {
    if (token) {
      console.log(this.selectedRoles.group_name)
      this.roleService.deleteUserRole(token, this.selectedRoles.group_name).subscribe(
        (data: any) => {
          console.log(data);
          this.refreshRoles();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Role Deleted Successfully'});
        },
        (error: any) => {
          // Handle the error case
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete role'});
        }
      );
    }
  });
}


  // roles = [
  //   { name: "admin", actions: ["create", "read", "update", "delete"] },
  //   { name: "marketing", actions: ["create", "read", "update"] },
  //   { name: "customer service", actions: ["read", "update"] },
  //   { name: "sales", actions: ["read"] },
  // ];

  clear(table: Table) {
    table.clear();
  }


  protected readonly console = console;
}
