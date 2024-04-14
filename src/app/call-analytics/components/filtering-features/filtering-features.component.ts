import { Component, OnInit } from '@angular/core';

interface Topic {
  name: string;
  code: string;
}

interface SentiCatg{
  name: string;
  code: string;
}
@Component({
  selector: 'app-filtering-features',
  templateUrl: './filtering-features.component.html',
  styleUrl: './filtering-features.component.scss',
})
export class FilteringFeaturesComponent implements OnInit{
  rangeDates: Date[] | undefined;

  value: string | undefined;   //Keyword

  value1!: number;  //Slider

  topic: Topic[] | undefined;

  selectedTopic: Topic | undefined;

  sentiCatg: SentiCatg[] | undefined;

  selectedSentiCatg: SentiCatg | undefined;

  ngOnInit() {
      this.topic = [
          { name: 'Pricing', code: 'PCG' },
          { name: 'Product', code: 'PDT' },
          { name: 'services', code: 'SVC' },
          { name: 'Issues', code: 'IS' },
          { name: 'Website', code: 'WS' }
      ];

      this.sentiCatg = [
        { name: 'Positive', code: 'POS' },
        { name: 'Neutral', code: 'NEU' },
        { name: 'Negative', code: 'NEG' }
      ];
  }
}

