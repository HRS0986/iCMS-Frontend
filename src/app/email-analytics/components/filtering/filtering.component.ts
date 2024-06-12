import { Component } from '@angular/core';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
  }
  
@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.scss'
})
export class FilteringComponent {
  selectedItemsSender: any[] | undefined;
  selectedItemsReceiver: any[] | undefined;
  selectedItemsTags: any[] | undefined;
  selectedItemsStatus: any[] | undefined;
  selectedDate: Date[] | undefined;

  itemsSender!: any[];
  itemsReceiver!: any[];
  itemsTags!: any[];
  itemsStatus!: any[];

  reqAllTags: boolean = false;
  importantOnly: boolean = false;
  newOnly: boolean = false;

  searchSender(event: AutoCompleteCompleteEvent) {
    this.itemsSender = ['a', 'b', 'c', 'd', 'e'].map((item) => event.query + '-' + item);
  }
  searchReceiver(event: AutoCompleteCompleteEvent) {
    this.itemsReceiver = ['a', 'b', 'c', 'd', 'e'].map((item) => event.query + '-' + item);
  }
  searchTags(event: AutoCompleteCompleteEvent) {
    this.itemsTags = ['a', 'b', 'c', 'd', 'e'].map((item) => event.query + '-' + item);
  }
  searchStatus(event: AutoCompleteCompleteEvent) {
    this.itemsStatus = ['a', 'b', 'c', 'd', 'e'].map((item) => event.query + '-' + item);
  }
  onClickTest() {
    console.log('test');
  }
  clickImportant() {
    this.importantOnly = !this.importantOnly;
  }
  clickNew() {
    this.newOnly = !this.newOnly;
  }
}
