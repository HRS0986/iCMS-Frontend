import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: "app-role-management",
  templateUrl: "./role-management.component.html",
  styleUrl: "./role-management.component.scss",
})
export class RoleManagementComponent {
  breadcrumbItems: MenuItem[] = [
    { label: "App Settings" },
    { label: "Role Management" },
  ];
  roles = [
    { name: "admin", actions: ["create", "read", "update", "delete"] },
    { name: "marketing", actions: ["create", "read", "update"] },
    { name: "customer service", actions: ["read", "update"] },
    { name: "sales", actions: ["read"] },
  ];
  clear(table: Table) {
    table.clear();
  }
}
