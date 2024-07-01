import { Component, Input } from '@angular/core';
import { Suggestion } from '../../interfaces/suggestions';
import { format } from 'date-fns';

@Component({
  selector: 'app-suggestion-card-list-type',
  templateUrl: './suggestion-card-list-type.component.html',
  styleUrl: './suggestion-card-list-type.component.scss'
})
export class SuggestionCardListTypeComponent {
  @Input() suggestionData!: Suggestion;

  displayedSuggestedDate: string = '';

  ngOnInit() {
    this.updateDisplayedDates();
  }

  ngOnChanges() {
    this.updateDisplayedDates();
  }

  private updateDisplayedDates() {
    const now = new Date();
    console.log(this.suggestionData.dateSuggested);
    console.log(typeof this.suggestionData.dateSuggested);
    const suggestedDiff = now.getTime() - this.suggestionData.dateSuggested.getTime();
    this.displayedSuggestedDate = this.formatTimeDifference(suggestedDiff);
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

  loading: boolean = false;
  dialogVisible: boolean = false;

  formatDate(date: Date): string {
    return format(date, 'EEE, MMM do') + ' @ ' + format(date, 'HH:mm')
  }
}
