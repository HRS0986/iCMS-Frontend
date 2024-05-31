import { Component, Input } from '@angular/core';
import { Suggestion, SuggestionAdditionalData } from '../../interfaces/suggestions';
import { SuggestionService } from '../../services/suggestion.service';

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

  constructor(private suggestionService: SuggestionService) { }

  loading: boolean = false;
  dialogVisible: boolean = false;
  additionalData: SuggestionAdditionalData = {
    gibberish: ''
  };
  errorMessage: string = '';

  load() {
    this.loading = true;
    this.suggestionService.getSuggestionAdditionalData(this.suggestionData.id).subscribe({
      next: (response: SuggestionAdditionalData) => {
        this.additionalData = response;
        console.log('next' + this.additionalData.gibberish);
        this.loading = false;
        this.dialogVisible = true;
      },
      error: (error: any) => {
        this.errorMessage = error;
        this.dialogVisible = true;
        console.log('err' + error);
        this.loading = false;
      }
    });
  }
}
