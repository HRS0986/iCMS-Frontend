import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'] // Correct the property name
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle!: string;
  @Input() showDatePicker: boolean = true;
  @Input() showButton: boolean = false;
  @Input() breadcrumbItems: MenuItem[] = [];

  rangeDates: Date[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router) {} // Inject Router in the constructor

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  addCallRecordings() {
    this.router.navigate(['/call/callrecordingsupload']);
  }
}
