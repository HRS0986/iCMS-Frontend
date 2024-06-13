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
  selectedItemsSender: string[] = [];
  selectedItemsReceiver: string[] = [];
  selectedItemsTags: string[] = [];
  selectedItemsStatus: string[] = [];
  selectedDate: Date[] = [];
  searchText: string = '';
  otherText: string = '';

  itemsSender!: any[];
  itemsReceiver!: any[];
  itemsTags!: any[];
  itemsStatus!: any[];

  reqAllTags: boolean = false;
  importantOnly: boolean = false;
  newOnly: boolean = false;

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
    this.importantOnly = !this.importantOnly;
  }
  clickNew() {
    this.newOnly = !this.newOnly;
  }
  calculateDates() {
    this.currentDate = new Date();
    let tmp = new Date();
    tmp.setTime(tmp.getTime() - ((24*60*60*1000) * this.goBackDays))   // handling the date substraction
    this.lastDate = new Date(tmp);
  } 
  applyFilters() {
    this.filterCriteria.selectedSenders = this.selectedItemsSender;
    this.filterCriteria.selectedReceivers = this.selectedItemsReceiver;
    this.filterCriteria.selectedTags = this.selectedItemsTags;
    this.filterCriteria.reqAllTags = this.reqAllTags;
    this.filterCriteria.selectedStatus = this.selectedItemsStatus;
    this.filterCriteria.selectedDate = this.selectedDate;
    this.filterCriteria.searchText = this.searchText;
    this.filterCriteria.importantOnly = this.importantOnly;
    this.filterCriteria.newOnly = this.newOnly;
    
    this.filterEmitter.emit(this.filterCriteria);
  }
  clearFilters() {
    this.filterCriteria = this.emptyFilterCriteria;
  }
  cancelFilters() {
    this.clearFilters();
    this.applyFilters();
  }
}
