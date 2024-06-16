import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from "primeng/api";
import { DataService } from './dashboard.component.data.service';
import { GaugeChartResponse, SentimentsByTimeResponse, SentimentsByTopicResponse, SentimentsDistributionByTimeResponse, get_current_overall_sentiments_response, stat_card_single_response, word_cloud_single_response } from '../../interfaces/dashboard';

interface TrendingTopic {
  text: string;
  frequency: number;
}

interface TrendingWord {
  word: string;
  weight: number;
  color: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit{

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Dashboard1"}
  ];
  
 intervalInDays: number = 29;

  // calenders

  rangeDates: Date[] | undefined;
  
  fromDate: Date | undefined;
  toDate: Date | undefined;

  minDate: Date = new Date();
  maxDate: Date = new Date();


  // Topic cloud
  keywords: TrendingTopic[] = [];
  isLoadingTC: boolean = true;
  
  // overall sentiments donought chart inputs
  chartData: number[] = [];
  isLoadingDC: boolean = true;

  // stat cards inputs
  statsData: stat_card_single_response[] = [
    { title: 540, sub_title: 'Total Emails', header: 'Customer Care', sentiment: 'Positive', imgPath: './email/mail_blue.png' },
    { title: 340, sub_title: 'Total Emails', header: 'Marketing', sentiment: 'Negative', imgPath: './email/mail_red.png' }
    // Add more objects as needed
  ];

  isLoadingStatCards: boolean = true;


  // sentiments by topics inputs
  sbtChartLabels: string[] = [];
  sbtChartColors: string[] = [];
  sbtChartValues:number[] = [];
  isLoadingSBT: boolean = true;


  // sentiments by time inputs
  labelsForSentimentsByTime: string[] = [];
  positive_values_forSentimentsByTime: number[] = [];
  neutral_values_forSentimentsByTime: number[] =  [];
  negative_values_forSentimentsbyTime: number[] = [];
  isLoadingSBTime: boolean = true;


  // wordcloud
  wordCloudData: TrendingWord[] = []
  isLoadingWCC: boolean = true

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
  // the same isLoadingSDT is used here as above


  // overall sentiment score  (gauge chart)
  dataValue_forGaugeStart!:number;

  isLoadingGC:boolean = true;
  

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
 
  

  this.getCurrentOverallSentiments()
  // this.getDataForTopicsCloud()
  this.getDataForStatCards()
  this.getDataForSentimentsByTopic()
  this.getDataForSentimentsByTime()
  this.getDataForWordCloud()
  this.getDataForSentimentsDistribtuionOfTopics()
  this.getDataForGaugeChart()

  }



onRangeDatesChanged(rangeDates: Date[]) {
  this.rangeDates = rangeDates;
  
  console.log('Selected Range Dates:', this.rangeDates);
  const endDate = rangeDates[1]
  const startDate = rangeDates[0]

  // Calculate the difference in milliseconds
  const differenceMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  this.intervalInDays = differenceMs / (1000 * 3600 * 24);

  console.log('Difference in days:', this.intervalInDays);

  this.getCurrentOverallSentiments()
  // this.getDataForTopicsCloud()
  this.getDataForStatCards()
  this.getDataForSentimentsByTopic()
  this.getDataForSentimentsByTime()
  this.getDataForWordCloud()
  this.getDataForSentimentsDistribtuionOfTopics()
  this.getDataForGaugeChart()
}



getCurrentOverallSentiments(){
    
   this.isLoadingDC = true;
    // get data for the current overall sentiments
    this.dataService.getCurrentOverallSentiments(this.intervalInDays).subscribe((data:get_current_overall_sentiments_response) => {
    console.log(Object.keys(data).length)
    if (Object.keys(data).length !== 0){
      // const dictData = data as unknown as { positive_percentage: number, neutral_percentage: number, negative_percentage: number };
      const positivePercentage = data.positive_percentage;
      const neutralPercentage = data.neutral_percentage;
      const negativePercentage = data.negative_percentage;

      this.chartData = [negativePercentage, positivePercentage, neutralPercentage];
      this.isLoadingDC = false;
      console.log("CURRENT OVERALL SENTIMENTS", this.chartData)
    }
    else{
      // write the code to handle when data is an empty dict
    }
    
  });
}

// getDataForTopicsCloud(){

//   this.isLoadingTC = true;
//   this.dataService.getDataForTopicsCloud(this.intervalInDays).subscribe(data => {
//   const newkeywords:TrendingTopic[] = []
//   for (const item of data) {
//     // Access the "product" and "frequency" properties of each item
//     const product = item.product;
//     const frequency = item.frequency;
    
//     // Do something with topic and frequency, such as logging them to the console
//     console.log(`Topic: ${product}, Frequency: ${frequency}`);

//     newkeywords.push({"text":product, "frequency": frequency})
//   }

//     this.keywords = newkeywords 
//     this.isLoadingTC = false;
//   });

// }


getDataForStatCards(){

  this.dataService.getDataForStatCards(this.intervalInDays).subscribe((data:stat_card_single_response[]) => {
  console.log(data)
  this.statsData = data

  this.isLoadingStatCards = false
     
 });

}

getDataForSentimentsByTopic(){
  this.isLoadingSBT = true;

  this.dataService.getDataForSentimentsByTopic(this.intervalInDays).subscribe((data: SentimentsByTopicResponse) => {
  

  if (data.sbtChartLabels.length !== 0){
    this.sbtChartLabels = data.sbtChartLabels
    this.sbtChartColors = data.sbtChartColors
    this.sbtChartValues = data.sbtChartValues

    this.isLoadingSBT = false;
  }
 

 });
}

getDataForSentimentsByTime(){

  this.isLoadingSBTime = true;

  this.dataService.getDataForSentimentsByTime(this.intervalInDays).subscribe((data:SentimentsByTimeResponse) => {
  


  console.log("sentiments by time", data)

  this.labelsForSentimentsByTime = data.labels
  this.positive_values_forSentimentsByTime = data.positive_values
  this.neutral_values_forSentimentsByTime = data.neutral_values
  this.negative_values_forSentimentsbyTime = data.negative_values
  
  this.isLoadingSBTime = false;

 });
}

getDataForWordCloud(){

     this.isLoadingWCC = true

     // Get data for word cloud
     this.dataService.getDataForWordCloud(this.intervalInDays).subscribe((data:word_cloud_single_response[]) => {
      const newkeywords: TrendingWord[] = []
      for (const item of data) {
        // Access the "topic" and "frequency" properties of each item
        const topic = item.topic;
        const frequency = item.frequency;
        const color = item.color;
        
        // Do something with topic and frequency, such as logging them to the console
        console.log(`word: ${topic}, weight: ${frequency}`);
  
        newkeywords.push({"word":topic, "weight": frequency, "color": color})
      }
  
       this.wordCloudData = newkeywords
       this.isLoadingWCC = false
  
      
    });
}

getDataForSentimentsDistribtuionOfTopics(){

  this.isLoadingSDT = true

  this.dataService.getDataForSentimentsDistribtuionOfTopics(this.intervalInDays).subscribe((data: SentimentsDistributionByTimeResponse) => {
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


getDataForGaugeChart() {
  this.isLoadingGC = true; // Set loading indicator to true before making the request

  this.dataService.getDataForGaugeChart(this.intervalInDays)
    .subscribe((data: GaugeChartResponse) => {
      console.log("gauge chart data", data.value)
      this.dataValue_forGaugeStart = data.value
      console.log("datavaluefor gauge chart", this.dataValue_forGaugeStart)
      this.isLoadingGC = false;
    });
}

}