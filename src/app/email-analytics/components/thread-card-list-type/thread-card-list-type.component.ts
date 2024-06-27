import { Component, Input } from '@angular/core';
import { Thread } from '../../interfaces/threads';
import { UtilityService } from '../../services/utility.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-thread-card-list-type',
  templateUrl: './thread-card-list-type.component.html',
  styleUrl: './thread-card-list-type.component.scss'
})
export class ThreadCardListTypeComponent {
  @Input() threadData!: Thread;
  errorMessage = "";
  loading = false;
  rowsPerPage = 10;
  dialogVisible = false;
  displayedLastUpdate = "";
  popupDisplayedLastUpdate = "";

  constructor (utilityService: UtilityService) {}
  
  load() {
    this.updateAdditionalDates();
    this.dialogVisible = true;
  }

  ngOnInit() {
    this.updateDisplayedDates();
  }

  ngOnChanges() {
    this.updateDisplayedDates();
  }

  private updateDisplayedDates() {
    const now = new Date();
    const lastUpdateDiff = now.getTime() - this.threadData.lastUpdate.getTime();
    this.displayedLastUpdate = this.formatTimeDifference(lastUpdateDiff);
  }

  private formatTimeDifference(diff: number): string {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return 'just now';
    }
  }

  formatDate(date: Date): string {
    return format(date, 'EEE, MMM do') + ' @ ' + format(date, 'HH:mm')
  }

  private updateAdditionalDates() {
    this.popupDisplayedLastUpdate = this.formatDate(this.threadData.lastUpdate);
  }
}
