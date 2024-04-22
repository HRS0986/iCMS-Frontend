import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from "primeng/api";
import { DataService } from './dashboard.component.data.service';

interface Keyword {
  text: string;
  frequency: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit{

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Dashboard"}
  ];
  keywords: Keyword[] = [];
  
  // overall sentiments donought chart inputs
  chartData: number[] = [];
  isLoadingDC: boolean = true;

  // stat cards inputs
  statsData = [
    { title: 540, sub_title: 'Total Emails', header: 'Customer Care', sentiment: 'Positive', imgPath: './email/mail_blue.png' },
    { title: 340, sub_title: 'Total Emails', header: 'Marketing', sentiment: 'Negative', imgPath: './email/mail_red.png' }
    // Add more objects as needed
  ];


  // sentiments by topics inputs
  sbtChartLabels = [];
  sbtChartColors = [];
  sbtChartValues = [];
  isLoadingSBT: boolean = true;


  // sentiments by time inputs
  labelsForSentimentsByTime = [];
  positive_values_forSentimentsByTime = [];
  neutral_values_forSentimentsByTime =  [];
  negative_values_forSentimentsbyTime = [];
  isLoadingSBTime: boolean = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private dataService: DataService) {}

  userId: number = 1;


  ngOnInit(): void {
  
    // get data for the current overall sentiments
    this.dataService.getCurrentOverallSentiments(this.userId).subscribe(data => {
      console.log(Object.keys(data).length)
      if (Object.keys(data).length !== 0){
        const dictData = data as unknown as { positive_percentage: number, neutral_percentage: number, negative_percentage: number };
        const positivePercentage = dictData.positive_percentage;
        const neutralPercentage = dictData.neutral_percentage;
        const negativePercentage = dictData.negative_percentage;
  
        this.chartData = [negativePercentage, positivePercentage, neutralPercentage];
        this.isLoadingDC = false;
        console.log(this.chartData)
      }
      else{
        // write the code to handle when data is an empty dict
      }
     
    });


    this.dataService.getDataForTopicsCloud(this.userId).subscribe(data => {
      const newkeywords:Keyword[] = []
      for (const item of data) {
        // Access the "topic" and "frequency" properties of each item
        const topic = item.topic;
        const frequency = item.frequency;
        
        // Do something with topic and frequency, such as logging them to the console
        console.log(`Topic: ${topic}, Frequency: ${frequency}`);

        newkeywords.push({"text":topic, "frequency": frequency})
      }

       this.keywords = newkeywords

      
    });


    this.dataService.getDataForStatCards(this.userId).subscribe(data => {
       console.log(data)
       this.statsData = data
      
     
    });
    
    this.dataService.getDataForSentimentsByTopic(this.userId).subscribe((data: { [key: string]: any }) => {
  


       this.sbtChartLabels = data["sbtChartLabels"]
       this.sbtChartColors = data["sbtChartColors"]
       this.sbtChartValues = data["sbtChartValues"]

       this.isLoadingSBT = false;

    });

    this.dataService.getDataForSentimentsByTime(this.userId).subscribe((data: { [key: string]: any }) => {
  


      console.log("sentiments by time", data)

      this.labelsForSentimentsByTime = data["labels"]
      this.positive_values_forSentimentsByTime = data["positive_values"]
      this.neutral_values_forSentimentsByTime = data["neutral_values"]
      this.negative_values_forSentimentsbyTime = data["negative_values"]
      
      this.isLoadingSBTime = false

   });

  }

}