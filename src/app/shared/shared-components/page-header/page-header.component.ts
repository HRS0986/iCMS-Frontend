import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'] // Correct the property name
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle!: string;
  @Input() showDatePicker: boolean = false;
  @Input() showButton: boolean = false;
  @Input() buttonText: string = "";
  @Input() breadcrumbItems: MenuItem[] = [];
  @Input() showAddMemberButton: boolean = false;

  @Output() buttonAction: EventEmitter<any> = new EventEmitter();

  sidebarVisible: boolean = false;

  rangeDates: Date[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router) {} // Inject Router in the constructor

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  onClickActionButton(): void {
    this.buttonAction.emit();
  }

  addCallRecordings() {
    this.router.navigate(['/call/upload']);
  }

  addMember() {
    this.router.navigate(['/members/add']);
  }
}
