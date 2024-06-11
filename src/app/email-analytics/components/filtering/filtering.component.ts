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

  itemsSender!: any[];
  itemsReceiver!: any[];
  itemsTags!: any[];
  itemsStatus!: any[];
  checked = false;

  searchSender(event: AutoCompleteCompleteEvent) {
    this.itemsSender = ['a', 'b', 'c', 'd', 'e'].map((item) => event.query + '-' + item);
    console.log(this.itemsSender);
  }
  searchReceiver(event: AutoCompleteCompleteEvent) {
    this.itemsReceiver = [...Array(10).keys()].map((item) => event.query + '-' + item);
  }
  searchTags(event: AutoCompleteCompleteEvent) {
    this.itemsTags = [...Array(10).keys()].map((item) => event.query + '-' + item);
  }
  searchStatus(event: AutoCompleteCompleteEvent) {
    this.itemsStatus = [...Array(10).keys()].map((item) => event.query + '-' + item);
  }
}
