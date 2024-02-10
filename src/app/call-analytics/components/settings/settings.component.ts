import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  Keywords: any[] = [];
  emails: any[] = [];
  dir: string = '';
  checked: boolean = true;
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Settings' },
  ];
}
