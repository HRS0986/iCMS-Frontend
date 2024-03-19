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
    { text: "VEGA", size: 12},
    { text: "TravelBox", size: 8 },
    { text: "Lua", size: 7 },
    { text: "chargeNET", size: 6 },
    { text: "AiGrow", size: 5 },
    { text: "Cloud Smart School", size: 2 },
  ];
}