import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class settingsComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Settings"}
  ];

}