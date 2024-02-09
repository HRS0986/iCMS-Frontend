import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle!: string;
  @Input() showDatePicker: boolean = true;
  @Input() showButton: boolean = false;
  @Input() breadcrumbItems: MenuItem[] = [];

  rangeDates: Date[] | undefined;
  home: MenuItem | undefined;

  ngOnInit() {
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }
}
