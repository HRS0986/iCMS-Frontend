import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";

interface Keyword {
  text: string;
  size: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Dashboard"}
  ];
  keywords: Keyword[] = [
    { text: "Angular", size: 10 },
    { text: "JavaScript", size: 8 },
    { text: "TypeScript", size: 7 },
    { text: "HTML", size: 6 },
    { text: "CSS", size: 5 },
    { text: "Component", size: 4 },
    { text: "Module", size: 3 },
  ];
}