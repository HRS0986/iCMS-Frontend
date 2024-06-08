import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Table } from "primeng/table";
import { RoleSettingsService } from "../../services/role-settings.service"
import  {AuthenticationService} from "../../../auth/services/authentication.service";


@Component({
  selector: "app-role-management",
  templateUrl: "./role-management.component.html",
  styleUrl: "./role-management.component.scss",
})
export class RoleManagementComponent implements OnInit{

  constructor(private roleService: RoleSettingsService , private authService: AuthenticationService) {}
  roles: { name: string; actions: string[] }[] = [];
  
  ngOnInit() {
    this.authService.getIdToken().subscribe((token: any) => {
      this.roleService.getUserRoles(token).subscribe((data: any) => {
        this.getRolesName(data);      
      });
    });
  }

  breadcrumbItems: MenuItem[] = [
    { label: "App Settings" },
    { label: "Role Management" },
  ];
  // roles = [
  //   { name: "admin", actions: ["create", "read", "update", "delete"] },
  //   { name: "marketing", actions: ["create", "read", "update"] },
  //   { name: "customer service", actions: ["read", "update"] },
  //   { name: "sales", actions: ["read"] },
  // ];
  clear(table: Table) {
    table.clear();
  }

  getRolesName(data:any){
    data.Groups.forEach((role: any) => {
      this.roles.push({name: role.GroupName, actions: []});
    });
  }
}
