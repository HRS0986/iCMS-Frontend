import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  date1: Date | undefined;
  date2: Date | undefined;
  home: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Call Analytics' },
      { label: 'Dashboard' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
