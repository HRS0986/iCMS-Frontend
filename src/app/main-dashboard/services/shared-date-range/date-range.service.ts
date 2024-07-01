import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  private dateRangeSource = new BehaviorSubject<Date[] | undefined>(undefined);
  currentDateRange = this.dateRangeSource.asObservable();

  changeDateRange(range: Date[] | undefined): void {
    this.dateRangeSource.next(range);
  }

  changeDateRangeNotification(range: Date[] | undefined): void {
    this.dateRangeSource.next(range);
  }
  
}
