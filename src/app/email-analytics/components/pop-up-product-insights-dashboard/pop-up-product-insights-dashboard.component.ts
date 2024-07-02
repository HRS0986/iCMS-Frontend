import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { IssueInquiryFreqByProdcuts, SentimentsByTopicResponse, SentimentsDistributionByTimeResponse, word_cloud_single_response } from '../../interfaces/dashboard';
import { DataService } from '../../services/pop-up-product-insights.service';
import { Subscription } from 'rxjs';


interface TrendingWord {
  word: string;
  weight: number;
  color: string
}

@Component({
  selector: 'app-pop-up-product-insights-dashboard',
  templateUrl: './pop-up-product-insights-dashboard.component.html',
  styleUrl: './pop-up-product-insights-dashboard.component.scss'
})
export class PopUpProductInsightsDashboardComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Dashboard"},
    {label: "Product Insights"}
  ];


  @Input() intervalInDaysStart!: number;
  @Input() intervalInDaysEnd!: number;


  rangeDates: Date[] | undefined;
  
  fromDate: Date | undefined;
  toDate: Date | undefined;

  minDate: Date = new Date();
  maxDate: Date = new Date();
  
  // sentiments by topics inputs
  sbtChartLabels: string[] = [];
  sbtChartColors: string[] = [];
  sbtChartValues:number[] = [];
  isLoadingSBT: boolean = true;


  prodcuts_distri_of_issues_and_inquiries_labels: string[]=[]
  prodcuts_distri_of_issues_and_inquiries_datasets: any[]=[]
  isLoadingProductdistriOfIssuesnInquirires: boolean = true

  bestProduct!:string
  worstProduct!:string

  bestProductColor:string = 'var(--teal-400)'
  worstProductColor:string = 'var(--red-400)'

  isLoadingBestProduct:boolean = true
  isLoadingWorstProduct:boolean = true
  
  // wordcloudMostOccuringProblemTypes
  wordCloudData: TrendingWord[] = []
  isLoadingWCC: boolean = false;

    // sentiment distribution in topics ( stacked bar chart)
    labels_forStackedBarChart!: string[];
    negativeDataSet_forStackedBarChart!: number[];
    neutralDataSet_forStackedBarChart!: number[];
    positiveDataSet_forStackedBarChart!: number[];
    isLoadingSDT:boolean = true;
  
    // Average senimtents distribution in topics ( multi-horizontal bar chart)
  
    labels_forMultiHorizontal!: string[];
    positiveDataSet_forMulti_HorizontalBarChart!: number[];
    neutralDataSet_forMulti_HorizontalBarChart!: number[];
    negativeDataSet_forMulti_HorizontalBarChart!: number[];

  documentStyle = getComputedStyle(document.documentElement);
  
  private DataForProductsByIssueandInquirySubscription: Subscription | undefined;
  private DataForSentimentsByTopicSubscription: Subscription | undefined;
  private DataForWordCloudSubscription: Subscription | undefined;
  private DataForSentimentsDistribtuionOfTopicsSubscription: Subscription | undefined;
  
 
  constructor(private fb: FormBuilder, private http: HttpClient, private dataService: DataService) {}

 


  ngOnInit(): void {
      
      
      // calendar configuration
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prevMonth = (month === 0) ? 11 : month -1;
      let prevYear = year;
      this.minDate = new Date();
      this.minDate.setMonth(prevMonth);
      this.minDate.setFullYear(prevYear);
      this.maxDate = today;

      this.getDataForSentimentsByTopic()
      this.getDataForIssuenadInquiryByProducts()
      this.getDataForWordCloud()
      this.getDataForSentimentsDistribtuionOfTopics()

      
  }
  
  ngOnDestroy(): void {
    this.unsubscribeAll()
  
  }
  
onRangeDatesChanged(rangeDates: Date[]) {
  this.rangeDates = rangeDates;
  
  console.log('Selected Range Dates:', this.rangeDates);
  const endDate = rangeDates[1];
  const startDate = rangeDates[0];
  const today = new Date();

  // Ensure dates are in the same time zone for correct comparison
  const startDateMidnight = new Date(startDate.setHours(0, 0, 0, 0));
  const endDateMidnight = new Date(endDate.setHours(0, 0, 0, 0));
  const todayMidnight = new Date(today.setHours(0, 0, 0, 0));

  // Calculate the difference in milliseconds
  const differenceStartMs = todayMidnight.getTime() - startDateMidnight.getTime();
  const differenceEndMs = todayMidnight.getTime() - endDateMidnight.getTime();

  // Calculate the difference in days
  this.intervalInDaysStart = Math.floor(differenceStartMs / (1000 * 60 * 60 * 24))
  this.intervalInDaysEnd = Math.floor(differenceEndMs / (1000 * 60 * 60 * 24))

  console.log('Difference in days start:', this.intervalInDaysStart, 'Difference in days end:', this.intervalInDaysEnd);
  
  this.unsubscribeAll()

  this.getDataForSentimentsByTopic()
  this.getDataForIssuenadInquiryByProducts()
  this.getDataForWordCloud()
  this.getDataForSentimentsDistribtuionOfTopics()
}


unsubscribeAll(){
  this.DataForSentimentsByTopicSubscription?.unsubscribe();
  this.DataForProductsByIssueandInquirySubscription?.unsubscribe();
  this.DataForWordCloudSubscription?.unsubscribe();
  this.DataForSentimentsDistribtuionOfTopicsSubscription?.unsubscribe();
}

getDataForIssuenadInquiryByProducts(){

  this.isLoadingBestProduct = true
  this.isLoadingWorstProduct = true
  this.isLoadingProductdistriOfIssuesnInquirires = true

  this.DataForProductsByIssueandInquirySubscription = this.dataService.getDataForProductsByIssueandInquiry(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: IssueInquiryFreqByProdcuts) => {
    console.log("data for Isseus and Inquiries by PRODUCTSSSSSS",data)
    
    // ]

      this.prodcuts_distri_of_issues_and_inquiries_labels = data.product_labels
      this.prodcuts_distri_of_issues_and_inquiries_datasets = [
        {
          type: 'bar',
          label: 'No of Issues',
          backgroundColor: this.documentStyle.getPropertyValue('--issue-color'),
          data: data.issue_freq
      },
      {
          type: 'bar',
          label: 'No of Inquiries',
          backgroundColor: this.documentStyle.getPropertyValue('--inquiry-color'),
          data: data.issue_freq
      }

      ]

    this.bestProduct = data.best_product
    this.worstProduct = data.worst_product

    this.isLoadingBestProduct = false
    this.isLoadingWorstProduct = false
    this.isLoadingProductdistriOfIssuesnInquirires = false



  });


}


getDataForSentimentsByTopic(){
  this.isLoadingSBT = true;

  this.DataForSentimentsByTopicSubscription = this.dataService.getDataForSentimentsByTopic(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: SentimentsByTopicResponse) => {
  

  if (data.sbtChartLabels.length !== 0){
    this.sbtChartLabels = data.sbtChartLabels
    this.sbtChartColors = data.sbtChartColors
    this.sbtChartValues = data.sbtChartValues

    this.isLoadingSBT = false;
  }
 

 });
}

getDataForWordCloud(){

  this.isLoadingWCC = true
  this.wordCloudData = [] 
  // Get data for word cloud
  this.DataForWordCloudSubscription = this.dataService.getDataForWordCloud(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data:word_cloud_single_response[]) => {
   console.log("WORD CLOUD DATA", data)
   
   for (const item of data) {
     // Access the "topic" and "frequency" properties of each item
     const topic = item.topic;
     const frequency = item.frequency;
     const color = item.color;
     
     // Do something with topic and frequency, such as logging them to the console
     console.log(`word: ${topic}, weight: ${frequency}`);
     this.wordCloudData.push({"word":topic, "weight": frequency, "color": color})
     
   }
   console.log("WORD CLOUD DATA JUST BEOFRE DISPLAYING PRODUCT INSIGHTS",  this.wordCloudData)
  
    this.isLoadingWCC = false

   
 });
}

getDataForSentimentsDistribtuionOfTopics(){

  this.isLoadingSDT = true

  this.DataForSentimentsDistribtuionOfTopicsSubscription = this.dataService.getDataForSentimentsDistribtuionOfTopics(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: SentimentsDistributionByTimeResponse) => {
    console.log("sentiments distribtion by topic", data)
    
    this.labels_forStackedBarChart = data.labels_freq
    this.positiveDataSet_forStackedBarChart = data.positive_values_freq
    this.neutralDataSet_forStackedBarChart = data.neutral_values_freq
    this.negativeDataSet_forStackedBarChart = data.negative_values_freq

    this.labels_forMultiHorizontal = data.labels_mean
    this.positiveDataSet_forMulti_HorizontalBarChart = data.positive_values_mean
    this.neutralDataSet_forMulti_HorizontalBarChart = data.neutral_values_mean
    this.negativeDataSet_forMulti_HorizontalBarChart = data.negative_values_mean

    this.isLoadingSDT = false

  });

}


}
