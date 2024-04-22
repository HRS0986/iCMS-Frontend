import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-query',
  templateUrl: './filter-query.component.html',
  styleUrl: './filter-query.component.scss'
})
export class FilterQueryComponent {
  @Input() topics!: string[];
}
