import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-permissions",
  templateUrl: "./permissions.component.html",
  styleUrl: "./permissions.component.scss",
})
export class PermissionsComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [
    { label: "Permissions" },
    { label: "Members" },
  ];

  tabs = [
    { label: "Roles", title: "Roles", content: "Roles" },
    { label: "Users", title: "Users", content: "Users" },
  ];
  activeIndex: number = 0;

  constructor() {}

  ngOnInit() {}
}
