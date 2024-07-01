import { Component, OnInit } from "@angular/core";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import { Table } from "primeng/table";
import { RoleSettingsService } from "../../services/role-settings.service"
import  {AuthenticationService} from "../../../auth/services/authentication.service";
import { RoleRefreshService } from "../../services/role-refresh.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import { Router} from "@angular/router";
import {CheckLoginService} from "../../../shared/shared-services/check-login.service";
import {RoleUpdateService} from "../../services/role-update.service";


@Component({
  selector: "app-role-management",
  templateUrl: "./role-management.component.html",
  styleUrl: "./role-management.component.scss",
  providers: [MessageService, ConfirmationService]
})
export class RoleManagementComponent implements OnInit{

  breadcrumbItems: MenuItem[] = [
    { label: "App Settings" },
    { label: "Role Management" },
  ];

  roles!: {group_name:string, number_of_users:number}[];
  selectedRoles!: { group_name: string, number_of_users: number };
  viewRolePopUpVisible: boolean = false;
  userGroupData:any;

  permissions: string[] = [];


  actions!: MenuItem[];

  constructor(
    private roleService: RoleSettingsService ,
    private authService: AuthenticationService,
    private roleRefreshService: RoleRefreshService,
    private messageService: MessageService,
    private router: Router,
    private checkLoginService: CheckLoginService,
    private confirmationService: ConfirmationService,
    private roleUpdateService: RoleUpdateService

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
          this.getRoleDetails()

          if(this.selectedRoles){
            this.viewRole();
          }else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No role selected'});
          }
        }
      },
      { label: "Update",
        icon: "pi pi-pencil",
        command: () => {
          console.log("Updating role");
          if(this.selectedRoles) {
            this.updateRole();
          }else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No role selected'});
          }
        }
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          console.log("Deleting role");
          if(this.selectedRoles) {
            this.deleteRole();
          }else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No role selected'});
          }
        }
      },
    ];
    this.authService.permissions$.subscribe((permissions: any) => {
      this.permissions = permissions;
      this.updateActions();
    });

  }

  viewRole() {
    // Here you can fetch more details about the role if needed.
    // For now, we'll just make the role view popup visible.
    this.viewRolePopUpVisible = true;
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
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
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
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  updateRole() {
    if(this.selectedRoles) {
      this.authService.getIdToken().subscribe((token: any) => {
        this.roleService.getRoleDetails(token, this.selectedRoles.group_name).subscribe(
          (data: any) => {
            console.log(data);
            this.roleUpdateService.roleToUpdate.next(data); // Emit the event with the role data
          },
          (error: any) => {
            console.log(error);
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to get role details'});
          }
        );
      });
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No role selected'});
    }
  }

  getRoleDetails() {
    this.authService.getIdToken().subscribe((token: any) => {
      this.roleService.getRoleDetails(token, this.selectedRoles.group_name).subscribe(
        (data: any) => {
          console.log(data);
          this.userGroupData = data;
        },
        (error: any) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to get role details'});
        }
      );
    });

  }
  updateActions() {
    const roleSelected = !!this.selectedRoles;
    this.actions = [
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          console.log("Viewing role");
          this.getRoleDetails()

          if(this.selectedRoles){
            this.viewRole();
          }else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No role selected'});
          }
        },
        disabled: !roleSelected || !this.permissions.includes('View Role')
      },
      {
        label: "Update",
        icon: "pi pi-pencil",
        command: () => {
          console.log("Updating role");
          if(this.selectedRoles) {
            this.updateRole();
          }else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No role selected'});
          }
        },
        disabled: !roleSelected || !this.permissions.includes('Edit Role')
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          console.log("Deleting role");
          if(this.selectedRoles) {
            this.deleteRole();
          }else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No role selected'});
          }
        },
        disabled: !roleSelected || !this.permissions.includes('Delete Role')
      },
      // ... other actions
    ];
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
