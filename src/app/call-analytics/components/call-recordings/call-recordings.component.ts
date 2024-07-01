import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-recordings',
  templateUrl: './call-recordings.component.html',
  styleUrl: './call-recordings.component.scss',
})
export class CallRecordingsComponent {
  constructor(private router: Router) {}

  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics', routerLink: '/call/dashboard' },
    { label: 'Call Recordings' },
  ];

  addCallRecording(): void {
    this.router.navigate(['/call/upload']);
  }
}
