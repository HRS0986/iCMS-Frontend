import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Dashboard"}
  ];

}
