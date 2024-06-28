import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from "primeng/api";
import { DataService } from './dashboard2.component.data.service';
import { BestPerformingEmailAccResponse, EmailAccEfficiencyResponse, InquiriesByEfficiencyEffectivenessResponse, IssueInquiryFreqByProdcuts, IssueInquiryFreqByTypeResponse, IssuesByEfficiencyEffectivenessResponse, OngoingAndClosedStatsResponse, OverallyEfficiencyEffectivenessPecentagesResponse, OverdueIssuesResponse } from '../../interfaces/dashboard';

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
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrl: './dashboard2.component.scss'
})
export class Dashboard2Component implements OnInit{
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Dashboard"}
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
  isLoadingTC: boolean = false;
  
  // overall sentiments donought chart inputs
  chartData: number[] = [];
  isLoadingDC: boolean = false;

  dntChartDataProgress: number[] = []
  dntChartProgressLabels: string[] = []
  isLoadingDCProgress : boolean = true;

  dntChartDataOverallEfficiency: number[] = []
  dntChartOverallEfficiencyLabels: string[] = []
  isLoadingDCOverallEfficiency : boolean = true;

  dntChartDataOverallEffeftiveness: number[] = []
  dntChartOverallEffectivenessLabels: string[] = []
  isLoadingDCOverallEffectiveness: boolean = true;

  
  effi_dstri_vert_bar_labels: string[]=[]
  effi_distri_vert_var_issues_data: number[]=[]
  effi_distri_vert_var_inquiries_data: number[] =[]
  isLoadingEffiDistri: boolean = true;

  effect_dstri_vert_bar_labels: string[]=[]
  effect_distri_vert_var_issues_data: number[]=[]
  effect_distri_vert_var_inquiries_data: number[] =[]
  isLoadingEffectDistri: boolean = true;

  issue_types_distri_labels: string[]=[]
  issue_types_distri_colors: any[]=[]
  issue_types_distri_data: number[]=[]
  isLoadingIssueTypes: boolean = true

  inquiry_types_distri_labels: string[]=[]
  inquiry_types_distri_colors: any[]=[]
  inquiry_types_distri_data: number[]=[]
  isLoadingInquiryTypes: boolean = true

  prodcuts_distri_of_issues_and_inquiries_labels: string[]=[]
  prodcuts_distri_of_issues_and_inquiries_datasets: any[]=[]
  isLoadingProductdistriOfIssuesnInquirires: boolean = true

  bestProduct!:string
  worstProduct!:string

  bestProductColor:string = 'var(--teal-400)'
  worstProductColor:string = 'var(--red-400)'

  isLoadingBestProduct:boolean = true
  isLoadingWorstProduct:boolean = true
  
  bestEmail!: string
  bestEmailColor:string = 'var(--indigo-400)'
  isLoadingBestPerfEmail:boolean = true


  email_acc_effi_labels: string[]=[]
  email_acc_effi_dataset: any[]=[]
  isLoadingEffiByEmailAcc: boolean = true

  overallOverdueIssuesHeader!: string
  overallOverdueIssuesContent!: string
  noOfOverdueIssuesColor = 'var(--red-400)'
  isLoadingoverallOverdueIssuesCount: boolean = true

  overdueIssByEmailsLabels: string[]=[]
  overdueIssByEmailsColors: any[]=[]
  overdueIssByEmailsData: number[]=[]
  isLoadingOverdueIssByEmailAcc: boolean = true




  // wordcloudMostOccuringProblemTypes
  wordCloudData: TrendingWord[] = []
  isLoadingWCC: boolean = false;

  documentStyle = getComputedStyle(document.documentElement);
  
   // stat cards inputs
   statsData = [
    { title: 10, sub_title: 'total', header: 'Ongoing', subheader: 'issues', fontColor:this.documentStyle.getPropertyValue('--negative-color')},
    { title: 5, sub_title: 'total', header: 'Closed', subheader: 'issues', fontColor:this.documentStyle.getPropertyValue('--positive-color')},
    { title: 10, sub_title: 'total', header: 'Ongoing', subheader: 'inquiries', fontColor:this.documentStyle.getPropertyValue('--negative-color')},
    { title: 5, sub_title: 'total', header: 'Closed', subheader: 'inquiries', fontColor:this.documentStyle.getPropertyValue('--positive-color')}
    // Add more objects as needed
  ];
  isLoadingStatcards: boolean = false;
 
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

    //   this.wordCloudData = [{"word":"problemtype1", "weight": 10, "color": "rgba(102, 153, 255, 0.8)"},{"word":"problemtype2", "weight": 5, "color": "rgba(102, 153, 255, 0.8)"}]
    //   this.chartData = [30, 40, 30];
      
    //   this.dntChartDataOverallEfficiency = [40,20,20,20]
    //   this.dntChartOverallEfficiencyLabels =  ['Inefficient', 'Less Efficient', 'Moderately Efficient', 'Highly Efficient']
      
    //   this.dntChartDataOverallEffeftiveness = [40,20,20,20]
    //   this.dntChartOverallEffectivenessLabels = ['Ineffective', 'Minimally Effective', 'Moderately Effective', 'Highly Effective' ]
      
    //   this.dntChartDataProgress= [30,70]
    //   this.dntChartProgressLabels = ["ongoing percentage", "closed percentage"]

    //   this.effi_dstri_vert_bar_labels = ['Highly Efficient', 'Moderately Efficient', 'Less Efficient', 'Inefficient']
    //   this.effi_distri_vert_var_issues_data = [5,7,8,4]
    //   this.effi_distri_vert_var_inquiries_data = [7,7,6,2]

    //   this.effect_dstri_vert_bar_labels = ['Highly Effective', 'Moderately Effective', 'Minimally Effective', 'Ineffective']
    //   this.effect_distri_vert_var_issues_data = [6,7,8,0]
    //   this.effect_distri_vert_var_inquiries_data = [7,7,7,5]
      
    //   this.issue_types_distri_labels = [
    //     'Order Issues', 'Billing and Payment Problems', 'Account Issues', 
    //     'Product or Service Complaints', 'Technical Issues', 
    //     'Warranty and Repair Issues', 'Subscription Problems', 
    //     'Return and Exchange Problems'
    //     ]
    //   this.issue_types_distri_labels.forEach((label, index) => {
    //     this.issue_types_distri_colors.push("rgba(18, 86, 222, 0.9)");
    //   });
    //   this.issue_types_distri_data = [5,6,7,8,9,5,4,3]

    //   this.inquiry_types_distri_labels = [
    //     'Order Issues', 'Billing and Payment Problems', 'Account Issues', 
    //     'Product or Service Complaints', 'Technical Issues', 
    //     'Warranty and Repair Issues', 'Subscription Problems', 
    //     'Return and Exchange Problems'
    //     ]
    //   this.inquiry_types_distri_labels.forEach((label, index) => {
    //     this.inquiry_types_distri_colors.push("rgba(222, 18, 195, 0.9)");
    //   });
    //   this.inquiry_types_distri_data = [5,6,7,8,9,5,4,3]


      
      //this.prodcuts_distri_of_issues_and_inquiries_labels = ['vega', 'aston martin', 'dbx', 'porsche']
      // this.prodcuts_distri_of_issues_and_inquiries_datasets = [
      //   {
      //     type: 'bar',
      //     label: 'No of Issues',
      //     backgroundColor: this.documentStyle.getPropertyValue('--issue-color'),
      //     data: [21, 84, 24, 75]
      // },
      // {
      //     type: 'bar',
      //     label: 'No of Inquiries',
      //     backgroundColor: this.documentStyle.getPropertyValue('--inquiry-color'),
      //     data: [41, 52, 24, 74]
      // }

      // ]

    //   this.bestProduct = "VEGA EV"
    //   this.worstProduct = "Uber"
    

    //   this.bestEmail = "email account 1"

    //   this.email_acc_effi_labels = ['emailAcc1', "emailAcc2", "emailAcc3"]
    //   this.email_acc_effi_dataset = [
    //     {
    //       type: 'bar',
    //       label: 'Inefficient',
    //       backgroundColor:   this.documentStyle.getPropertyValue('--inefficient-color'),
    //       data: [21, 84, 24]
    //   },
    //   {
    //       type: 'bar',
    //       label: 'Less Efficient',
    //       backgroundColor: this.documentStyle.getPropertyValue('--less-efficient-color'),
    //       data: [41, 52, 24]
    //   },
    //   {
    //     type: 'bar',
    //     label: 'Moderately Efficient',
    //     backgroundColor:  this.documentStyle.getPropertyValue('--moderately-efficient-color'),
    //     data: [21, 84, 24]
    // },
    // {
    //     type: 'bar',
    //     label: 'High Efficient',
    //     backgroundColor: this.documentStyle.getPropertyValue('--highly-efficient-color'),
    //     // backgroundColor: "rgba(17, 193, 14, 0.9)",
    //     data: [41, 52, 24]
    // }

    //   ]


    //   this.overallOverdueIssuesHeader = `8 OVERDUE ISSUES recorded`
    //   this.overallOverdueIssuesContent = `out of 15 ongoing issues `


    //   this.overdueIssByEmailsLabels = ['emailAcc1', "emailAcc2", "emailAcc3"]
    //   for (let i of this.overdueIssByEmailsLabels){
    //     this.overdueIssByEmailsColors.push(this.documentStyle.getPropertyValue('--issue-color'))
    //   }

    //   this.overdueIssByEmailsData = [3,4,5]


      this.getDataForStatCards()
      this.getDataForOverallEfficiencyandEffectivenessDntChart()
      this.getDataForEfficiencyDstriandEffectivenessDistri()
      this.getDataForIssueandInquiryTypes()
      this.getDataForIssuenadInquiryByProducts()
      this.getDataForEfficiencyByEmaiAcss()
      this.getOverdueIssuesdata()

      
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
  
  this.getDataForStatCards()
  this.getDataForOverallEfficiencyandEffectivenessDntChart()
  this.getDataForEfficiencyDstriandEffectivenessDistri()
  this.getDataForIssueandInquiryTypes()
  this.getDataForIssuenadInquiryByProducts()
  this.getDataForEfficiencyByEmaiAcss()
  this.getOverdueIssuesdata()
  // this.getCurrentOverallSentiments()
  // this.getDataForTopicsCloud()
  // this.getDataForStatCards()
  // this.getDataForSentimentsByTopic()
  // this.getDataForSentimentsByTime()
  // this.getDataForWordCloud()
  // this.getDataForSentimentsDistribtuionOfTopics()
  // this.getDataForGaugeChart()
}

getDataForStatCards(){
  
  this.dataService.getDataForStatCards(this.intervalInDays).subscribe((data: OngoingAndClosedStatsResponse) => {
  console.log(data)
  this.statsData[0].title = data.count_total_ongoing_issues
  this.statsData[1].title = data.count_total_closed_issues
  this.statsData[2].title = data.count_total_ongoing_inquiries
  this.statsData[3].title = data.count_total_closed_inquiries

  // get data for the progress donought chart

  this.dntChartDataProgress = [data.ongoing_percentage, data.closed_percentage]
  this.dntChartProgressLabels = ["ongoing percentage", "closed percentage"]

  this.isLoadingDCProgress = false

     
 });

 this.isLoadingStatcards = false

}


getDataForOverallEfficiencyandEffectivenessDntChart(){


  this.dataService.getCurrentOverallEfficiencyandEffectiveness(this.intervalInDays).subscribe((data: OverallyEfficiencyEffectivenessPecentagesResponse) => {
    console.log("data for overall efficiency and effectiveness", data)
    this.dntChartDataOverallEfficiency = [0,0,40,60]
    this.dntChartOverallEfficiencyLabels= data.efficiency_categories
    this.dntChartDataOverallEffeftiveness= [0,0,30,70]
    this.dntChartOverallEffectivenessLabels = data.effectiveness_categories

    this.isLoadingDCOverallEfficiency = false
    this.isLoadingDCOverallEffectiveness = false

       
   });
}

getDataForEfficiencyDstriandEffectivenessDistri(){
   
  let effi_issue_data: number[] = [] 
  let effec_issue_date: number[] = []
  this.dataService.getDataForEffiandEffecIssues(this.intervalInDays).subscribe((data: IssuesByEfficiencyEffectivenessResponse) => {
    console.log("data for efficency and effectiveness of ISSUES DISTRIBUTION", data)

    effi_issue_data = data.efficiency_frequencies
    effec_issue_date = data.effectiveness_frequencies

       
   });

   this.dataService.getDataForEffiandEffecInquiries(this.intervalInDays).subscribe((data: InquiriesByEfficiencyEffectivenessResponse) => {
    console.log("data for efficiency and effectiveness of INQUIRIES DISTRIBUTION", data)
    
    this.effi_dstri_vert_bar_labels = data.efficiency_categories
    this.effect_dstri_vert_bar_labels = data.effectiveness_categories
    this.effi_distri_vert_var_inquiries_data = data.efficiency_frequencies
    this.effect_distri_vert_var_inquiries_data = data.effectiveness_frequencies
    this.effect_distri_vert_var_issues_data = effec_issue_date
    this.effi_distri_vert_var_issues_data = effi_issue_data

     this.isLoadingEffiDistri = false
     this.isLoadingEffectDistri = false
      
   });

  
}

getDataForIssueandInquiryTypes(){
  
 
  this.dataService.getDataForIssueandInquiryTypes(this.intervalInDays).subscribe((data: IssueInquiryFreqByTypeResponse) => {
    console.log("data for issue and inquiry types",data)

    this.issue_types_distri_labels = data.issue_type_labels


    this.issue_types_distri_labels.forEach((label, index) => {
      this.issue_types_distri_colors.push( this.documentStyle.getPropertyValue('--issue-color'));
    });
    

    this.issue_types_distri_data = data.issue_type_frequencies   

    this.inquiry_types_distri_labels =  data.inquiry_type_labels

    this.inquiry_types_distri_labels.forEach((label, index) => {
      this.inquiry_types_distri_colors.push(this.documentStyle.getPropertyValue('--inquiry-color'));
    });

    this.inquiry_types_distri_data = data.inquiry_type_frequencies

    this.isLoadingIssueTypes = false
    this.isLoadingInquiryTypes =  false


   });


   
}

getDataForIssuenadInquiryByProducts(){

  this.dataService.getDataForProductsByIssueandInquiry(this.intervalInDays).subscribe((data: IssueInquiryFreqByProdcuts) => {
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

getDataForEfficiencyByEmaiAcss(){

  
  this.dataService.getDataForEfficiencyByEmailAcc(this.intervalInDays).subscribe((data: EmailAccEfficiencyResponse) => {
    console.log("EFFICiency by emaila acc data", data)
    
    this.email_acc_effi_labels = data.all_reading_email_accs
    this.email_acc_effi_dataset = [
      {
        type: 'bar',
        label: 'Inefficient Percentage',
        backgroundColor:  this.documentStyle.getPropertyValue('--inefficient-color'),
        data: data.ineff_percentages
    },
    {
        type: 'bar',
        label: 'Less Efficient Percentage',
        backgroundColor: this.documentStyle.getPropertyValue('--less-efficient-color'),
        data: data.less_eff_percentages
    },
    {
      type: 'bar',
      label: 'Moderately Efficient Percentage',
      backgroundColor:   this.documentStyle.getPropertyValue('--moderately-efficient-color'),
      data: data.mod_eff_percentages
  },
  {
      type: 'bar',
      label: 'High Efficient Percentage',
      backgroundColor: this.documentStyle.getPropertyValue('--highly-efficient-color'),
      // backgroundColor: "rgba(17, 193, 14, 0.9)",
      data: data.highly_eff_percentages
  }

    ]

    this.isLoadingEffiByEmailAcc = false
  });


}

getBestPerformingEmail(){


  this.dataService.getBestPerformingEmail(this.intervalInDays).subscribe((data: BestPerformingEmailAccResponse) => {
    console.log("best performing email account", data)
 
    this.bestEmail = data.best_performing_email_acc
    this.isLoadingBestPerfEmail = false
  
       
   });
}


getOverdueIssuesdata(){
  

  this.dataService.getOverdueIssuesdata(this.intervalInDays).subscribe((data: OverdueIssuesResponse) => {
    console.log("overdue issues related DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa", data)
 
    this.overallOverdueIssuesHeader = `${data.sum_overdue_issues} OVERDUE ISSUES recorded`
    this.overallOverdueIssuesContent = `out of ${data.total_ongoing_issues} ongoing issues `
    this.isLoadingoverallOverdueIssuesCount = false
    
    this.overdueIssByEmailsLabels = data.all_reading_email_accs
    this.overdueIssByEmailsData = data.overdue_issues_count_per_each_email
    this.overdueIssByEmailsColors = []
    for (let i of this.overdueIssByEmailsLabels){
      this.overdueIssByEmailsColors.push(this.documentStyle.getPropertyValue('--issue-color'))
    }
    this.isLoadingOverdueIssByEmailAcc = false
  
       
   });
}

}
