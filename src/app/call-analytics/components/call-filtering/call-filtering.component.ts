import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-call-filtering',
  templateUrl: './call-filtering.component.html',
  styleUrl: './call-filtering.component.scss',
})
export class CallFilteringComponent {
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics', routerLink: '/call/dashboard' },
    { label: 'Call Filtering' },
  ];
}
