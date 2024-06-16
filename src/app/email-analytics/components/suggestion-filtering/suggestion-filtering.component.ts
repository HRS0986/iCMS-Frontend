import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from './suggestion-filtering.component.service';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { SuggestionService } from '../../services/suggestion.service';
import { Suggestion, SuggestionMetaDataResponse, SuggestionsData } from '../../interfaces/suggestions';


interface PageEvent {
  first: number | undefined;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-suggestion-filtering',
  templateUrl: './suggestion-filtering.component.html',
  styleUrl: './suggestion-filtering.component.scss'
})
export class SuggestionFilteringComponent {
  suggestionsData = [
    {receiver:"readingEmail1@gmail.com", date:"2024.05.06", products:["VEGA"], suggestion:"bla bla bla suggestion."},
    {receiver:"readingEmail2@gmail.com", date:"2024.06.06", products:["EV"], suggestion:"some other suggestion."}
  ]

  suggestionData: Suggestion[] = new Array(10).fill({
    id: '',
    suggestion: '',
    isNew: false,
    isPopular: false,
    dateSuggested: new Date(),
    tags: [],
    sender: '',
    recipient: '',
  });

  totalRecords: number = 0;
  loading: boolean = true;
  rowsPerPage = 10;
  sortField: string = 'dateSuggested';
  sortOrder: number = -1;
  errorMessage: string = '';
  dialogVisible: boolean = false;
  
  // Ranindu's vars
  dateRange: Date[] = [];
  products: string[] | undefined;
  productSelected!: string;
  recipientEmails: string[] | undefined;
  recipientEmailSelected!: string;
  // ----

  // first: number | undefined;

  // rows: number = 10;

  constructor(private dataservice: DataService, private suggestionService: SuggestionService) { }

  // Ranindu's functions
  ngOnInit() {
    this.products = [
        "VEGA",
        "TravelBox",
        "ChargeNet",
    ];

    this.recipientEmails = [
      "readingEmail1",
      "readingEmail2",
      "readingEmail3",
    ];


    this.recipientEmails = [
      "vega@codegen.net",
      "support@codegen.net",
      "travelbox@cg.net",
    ];
    
    // initalizing
    this.getAllProducts()
    this.getAllRecepientEmails()
    this.getFilteredSuggestions(30, "", "")

  }

  clearFilters() {
    this.dateRange = [];
    this.productSelected = "";
    this.recipientEmailSelected = "";
    this.getFilteredSuggestions(29, this.productSelected, this.recipientEmailSelected)
  }

  applyFilters() {
    const intervalInDays = this.calculateDatesInterval(this.dateRange)
    this.getFilteredSuggestions(intervalInDays, this.productSelected, this.recipientEmailSelected)
  }
  
  getFilteredSuggestions(intervalInDays: number, productSelected: string, recipientEmailSelected:string){

    this.dataservice.getDataForFilterSuggestions( intervalInDays, productSelected, recipientEmailSelected).subscribe((data: SuggestionsData[]) => {
      console.log("suggestions data", data)
      this.suggestionsData= data
      
     });

  }

  getAllRecepientEmails(){

    type dict = { [key: string]: any };

    this.dataservice.getAllRecepients().subscribe((data: dict) => {
      console.log("recepients data", data)
      this.recipientEmails= data["recepients"]
      
     });

  }

    
  getAllProducts(){

    type dict = { [key: string]: any };

    this.dataservice.getAllProducts().subscribe((data: dict) => {
      console.log("products data", data)
      this.products= data["products"]
      
     });

  }


  calculateDatesInterval(rangeDates: Date[]) {
    
    if (rangeDates.length !== 0){

      const endDate = rangeDates[1]
      const startDate = rangeDates[0]
    
      // Calculate the difference in milliseconds
      const differenceMs = endDate.getTime() - startDate.getTime();
    
      // Convert milliseconds to days
      const intervalInDays = differenceMs / (1000 * 3600 * 24);

      return intervalInDays
    }

    else{
      return 29
    }
  }
  // ---- End of Ranindu's functions

  loadSuggestions($event: DataViewLazyLoadEvent) {
    this.loading = true;
    this.suggestionService.getSuggestionMetadata($event.first ?? 0, $event.rows ?? 20).subscribe({
      next: (response: SuggestionMetaDataResponse) => {
        this.suggestionData = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error;
        this.loading = false;
        this.dialogVisible = true;
      }
    });
  }

  onPageChange(event: any) {
    this.rowsPerPage = event.rows;
    this.loadSuggestions({ first: event.first, rows: this.rowsPerPage, sortField: this.sortField, sortOrder: this.sortOrder });
  }

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Suggestions"}
  ];

}
