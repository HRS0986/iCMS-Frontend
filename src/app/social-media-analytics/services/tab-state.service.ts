import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabStateService {
  private activeTabSubject = new Subject<string>();
  activeTab$ = this.activeTabSubject.asObservable();

  setActiveTab(tabName: string) {
    this.activeTabSubject.next(tabName);
  }
}
