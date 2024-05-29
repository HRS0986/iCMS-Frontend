import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from './suggestion-filtering.component.service';

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

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Email Filtering"}
  ];

  suggestionsData = [
    {receiver:"readingEmail1@gmail.com", date:"2024.05.06", products:["VEGA"], suggestion:"bla bla bla suggestion."},
    {receiver:"readingEmail2@gmail.com", date:"2024.06.06", products:["EV"], suggestion:"some other suggestion."}
  ]
  
  dateRange: Date[] = [];
  products: string[] | undefined;
  productSelected!: string;
  recipientEmails: string[] | undefined;
  recipientEmailSelected!: string;

  first: number | undefined;

  rows: number = 10;


  constructor(private dataservice: DataService) { }

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

    type dict = { [key: string]: any };

    this.dataservice.getDataForFilterSuggestions( intervalInDays, productSelected, recipientEmailSelected).subscribe((data: dict) => {
      console.log("suggestions data", data)
      this.suggestionsData= data["suggestionsData"]
      
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

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }



}
