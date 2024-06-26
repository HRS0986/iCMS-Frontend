import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Filter } from '../../interfaces/filters';
import { FilterService } from '../../services/filter.service';

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
  @Input() type!: "issue" | "inquiry" | "suggestion";

  // Arrays to hold the returned data from the server
  dataSender: string[] = [];
  dataReceiver: string[] = [];
  dataTags: string[] = [];
  dataStatus: string[] = [];

  // Temporary arrays for the autocomplete
  itemsSender: string[] = [];
  itemsReceiver: string[] = [];
  itemsTags: string[] = [];
  itemsStatus: string[] = [];

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

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.loadTags();
    this.loadStatus();
    this.loadCompanyAddresses();
    this.loadClientAddresses();
  }

  loadTags() {
    this.filterService.getTags(this.type).subscribe((response) => {
      this.dataTags = response.tags;
    });
  }
  loadStatus() {
    this.filterService.getStatus(this.type).subscribe((response) => {
      this.dataStatus = response.status;
    });
  }
  loadCompanyAddresses() {
    this.filterService.getCompanyAddresses(this.type).subscribe((response) => {
      this.dataReceiver = response.company_addresses;
    });
  }
  loadClientAddresses() {
    this.filterService.getClientAddresses(this.type).subscribe((response) => {
      this.dataSender = response.client_addresses;
    });
  }

  // search*Something* functions are used to search for the items in the autocomplete
  searchSender(event: AutoCompleteCompleteEvent) {
    this.itemsSender = this.search(event.query, this.dataSender);
  }
  searchReceiver(event: AutoCompleteCompleteEvent) {
    this.itemsReceiver = this.search(event.query, this.dataReceiver);
  }
  searchTags(event: AutoCompleteCompleteEvent) {
    this.itemsTags = this.search(event.query, this.dataTags);
  }
  searchStatus(event: AutoCompleteCompleteEvent) {
    this.itemsStatus = this.search(event.query, this.dataStatus);
  }

  /**
   * Filters and sorts an array of items based on a search query.
   * 
   * @param query - The search query to filter the items.
   * @param items - The array of items to be filtered and sorted.
   * @returns An array of filtered and sorted items.
   * @example
   *  search('me', ['home', 'mercury', 'welcome', 'xyz']) = ['mercury', 'home', 'welcome']
   */
  search(query: string, items: any[]) {
    try {
      return items
        .filter((item) => item.toLowerCase().indexOf(query.toLowerCase()) > -1)
        .sort((a, b) => { // sort by index of the query in the item; items that match the query at the beginning will be first
          const indexA = a.toLowerCase().indexOf(query.toLowerCase());
          const indexB = b.toLowerCase().indexOf(query.toLowerCase());
          return indexA - indexB;
        });
    }
    catch (e) {
      console.info('Error in search function:', e);
      return items.filter(()=>false)  // return empty array if there is an error
    }
  }

  // Click functions
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

  // Button functions
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
