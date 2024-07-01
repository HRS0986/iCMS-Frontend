import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { MenuItem } from "primeng/api";
import { DateRangeService } from '../../../main-dashboard/services/shared-date-range/date-range.service';

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
  @Input() showAddWidgetButton: boolean = false;
  @Input() showAddRoleButton: boolean = false;
  @Input() showRightSideBarButtons: boolean = false;

  @Input() mainDashboardNotification:boolean=false;

  @Input() mainDashboardDate:boolean=false;

  @Input() minDate: Date = new Date();
  @Input() maxDate: Date = new Date();

  @Output() buttonAction: EventEmitter<any> = new EventEmitter();


  @Output() rangeDatesChanged: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  sidebarVisible: boolean = false;

  rangeDates: Date[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router,  private dateRangeService: DateRangeService) {} // Inject Router in the constructor



  onRangeDateChange(rangeDates: Date[]) {
    this.rangeDatesChanged.emit(rangeDates);
  }

  ngOnInit() {
    this.rangeDates = this.getCurrentDateRange();
    this.dateRangeService.changeDateRange(this.rangeDates);
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.showOldDate();
  }

  getCurrentDateRange = (): Date[] => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 7);

    return [pastDate, today];
  };

  onClickActionButton(): void {
    this.buttonAction.emit();
  }

  addCallRecordings() {
    this.router.navigate(['/call/upload']);
  }

  addMember() {
    this.router.navigate(['/members/add']);
  }

  onDateRangeChange(): void {
    if (this.rangeDates) {
      this.dateRangeService.changeDateRange(this.rangeDates);
      this.oldDateSave(this.rangeDates);
    }
  }

  onDateRangeChangeNotifications(): void {
    if (this.rangeDates) {
      this.dateRangeService.changeDateRange(this.rangeDates);
      // this.oldDateSave(this.rangeDates);
    }
  }

  oldDateSave(dateRange: Date[]): void {
    caches.open('all-data').then(cache => {
      const dateStrings = dateRange.map(date => date.toISOString());
      const dataResponse = new Response(JSON.stringify(dateStrings), {
        headers: { 'Content-Type': 'application/json' }
      });
      cache.put('old-date', dataResponse);
    });
  }

  showOldDate(): void {
    caches.open('all-data').then(cache => {
      cache.match('old-date').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then((data: string[]) => {
            this.rangeDates = data.map(dateString => new Date(dateString));
            this.dateRangeService.changeDateRange(this.rangeDates);
          });
        } else {
          // console.log('Data not found in cache');
        }
      });
    });
  }
}
