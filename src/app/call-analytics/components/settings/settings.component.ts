import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Settings' },
  ];
}
