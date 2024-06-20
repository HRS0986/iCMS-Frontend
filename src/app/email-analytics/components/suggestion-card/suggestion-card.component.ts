import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.scss'
})
export class SuggestionCardComponent {

  @Input() receiver!: string;
  @Input() date!: string;
  @Input() productsList: string[]=[];
  @Input() suggestion!: string;
}
