import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})
export class PIComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Social Media Analytics"},
    {label: "Platform Insights"}
  ];

}