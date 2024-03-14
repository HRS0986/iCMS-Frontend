import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-email-filtering',
  templateUrl: './email-filtering.component.html',
  styleUrl: './email-filtering.component.scss'
})
export class EmailFilteringComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Filtering"}
  ];
}
