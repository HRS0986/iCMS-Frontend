import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import { MessageService } from 'primeng/api';

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

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.getIdToken().pipe(
      catchError(error => {
        if (error === 'Session expired. Please sign in again.') {
          // Handle session expired error
          // For example, redirect the user to the sign in page
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to get token'});
        }
        return of(null);
      })
    )

  }

}
