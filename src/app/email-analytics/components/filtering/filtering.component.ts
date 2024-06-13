import { Component, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../interfaces/filters';

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
  otherText: string = '';

  itemsSender!: any[];
  itemsReceiver!: any[];
  itemsTags!: any[];
  itemsStatus!: any[];

  currentDate!: Date;
  lastDate!: Date;  // last date that can be selected in the date picker
  goBackDays: number = 30 // how many days back can the user select in date picker

  emptyFilterCriteria: Filter = {
    selectedSenders: [],
    selectedReceivers: [],
    selectedTags: [],
    reqAllTags: false,
    selectedStatus: [],
    selectedDate: [],
    searchText: '',
    importantOnly: false,
    newOnly: false
  };

  filterCriteria: Filter = this.emptyFilterCriteria;

  @Output() filterEmitter = new EventEmitter<any>();

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
    this.filterCriteria.importantOnly = !this.filterCriteria.importantOnly;
  }
  clickNew() {
    this.filterCriteria.newOnly = !this.filterCriteria.newOnly;
  }
  calculateDates() {
    this.currentDate = new Date();
    let tmp = new Date();
    tmp.setTime(tmp.getTime() - ((24*60*60*1000) * this.goBackDays))   // handling the date substraction
    this.lastDate = new Date(tmp);
  } 
  applyFilters() {
    this.filterEmitter.emit(this.filterCriteria);
  }
  clearFilters() {
    this.filterCriteria = {
      selectedSenders: [],
      selectedReceivers: [],
      selectedTags: [],
      reqAllTags: false,
      selectedStatus: [],
      selectedDate: [],
      searchText: '',
      importantOnly: false,
      newOnly: false
    };
  }
  cancelFilters() {
    this.clearFilters();
    this.applyFilters();
  }
}
