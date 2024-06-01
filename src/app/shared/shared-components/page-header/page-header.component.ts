import { EventEmitter, Output } from '@angular/core';
import {booleanAttribute, Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { MenuItem } from "primeng/api";
import { DateRangeService } from '../../../main-dashboard/services/shared/date-range.service';

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

  @Input() minDate: Date = new Date();
  @Input() maxDate: Date = new Date();

  @Output() buttonAction: EventEmitter<any> = new EventEmitter();


  @Output() rangeDatesChanged: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  sidebarVisible: boolean = false;

  rangeDates: Date[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router, private dateRangeService: DateRangeService) {} // Inject Router in the constructor



  onRangeDateChange(rangeDates: Date[]) {
    this.rangeDatesChanged.emit(rangeDates);
  }


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

  onDateRangeChange(): void {
    this.dateRangeService.changeDateRange(this.rangeDates);
    // if (this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0] && this.rangeDates[1]) {
    //   this.oldDateSave(this.rangeDates);
    // } else if(this.rangeDates && this.rangeDates.length === 2 && this.rangeDates[0]){
    //   // this.oldDateSave(this.rangeDates);
    // }else if(this.rangeDates==undefined){
    //   console.log("hiii");
    //   this.showOldDate();
    // }
  }

  oldDateSave(Date:any){
    caches.open('all-data').then(cache => {
      cache.match('old-date').then((cachedResponse) => {
        // if (cachedResponse) {
        //   cachedResponse.json().then((cachedData: any) => {
            // Compare the response with the cached data
        //     if (!this.isEqual(response, cachedData)) {
        //       // Update only the changed data in the cache
        //       // const updatedData = { ...cachedData, ...response };
        //       const dataResponse = new Response(JSON.stringify(response), {
        //         headers: { 'Content-Type': 'application/json' }
        //       });
        //       cache.put('data', dataResponse);
        //       this.DataCacheChange = true;
        //     }
        //   });
        // } else {
          // Cache the response if no cached data exists
          const dataResponse = new Response(JSON.stringify(Date), {
            headers: { 'Content-Type': 'application/json' }
          });
          cache.put('old-date', dataResponse);
        });
      // }
    // });
  });

  }

  showOldDate(){
    caches.open('all-data').then(cache => {
      cache.match('old-date').then(cachedResponse => {
        if (cachedResponse) {
          cachedResponse.json().then(data => {
            console.log("Date:",data);
            this.rangeDates=data;
          });
        } else {
          console.log('Data not found in cache');
        }
      });
    });
  }


}
