import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from "primeng/api";
import { BestPerformingEmailAccResponse, EmailAccEfficiencyResponse, InquiriesByEfficiencyEffectivenessResponse, IssueInquiryFreqByProdcuts, IssueInquiryFreqByTypeResponse, IssuesByEfficiencyEffectivenessResponse, OngoingAndClosedStatsResponse, OverallyEfficiencyEffectivenessPecentagesResponse, OverdueIssuesResponse } from '../../interfaces/dashboard';
import { DataService } from '../../services/dashboardMain.service';
import { Subscription } from 'rxjs';

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

  intervalInDaysStart: number = 29;
  intervalInDaysEnd: number = 0;

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
    { title: 0, sub_title: 'total', header: 'Ongoing', subheader: 'issues', fontColor:this.documentStyle.getPropertyValue('--negative-color')},
    { title: 0, sub_title: 'total', header: 'Closed', subheader: 'issues', fontColor:this.documentStyle.getPropertyValue('--positive-color')},
    { title: 0, sub_title: 'total', header: 'Ongoing', subheader: 'inquiries', fontColor:this.documentStyle.getPropertyValue('--negative-color')},
    { title: 0, sub_title: 'total', header: 'Closed', subheader: 'inquiries', fontColor:this.documentStyle.getPropertyValue('--positive-color')}
    // Add more objects as needed
  ];
  isLoadingStatcards: boolean = false;
  
  private statCardsSubscription: Subscription | undefined;
  private DataForEffiandEffecIssuesSubscription: Subscription | undefined;
  private DataForEffiandEffecInquiriesSubscription: Subscription | undefined;
  private CurrentOverallEfficiencyandEffectivenessSubscription: Subscription | undefined;
  private DataForIssueandInquiryTypesSubscription: Subscription | undefined;
  private DataForProductsByIssueandInquirySubscription: Subscription | undefined;
  private DataForEfficiencyByEmailAccSubscription: Subscription | undefined;
  private BestPerformingEmailSubscription: Subscription | undefined;
  private OverdueIssuesdataSubscription: Subscription | undefined;


  _isPerfInsightsOpened: boolean = false;
  set isPerfInsightsOpened(value: boolean) {
    this._isPerfInsightsOpened = value;
    if (value) {
      this.unsubscribeAll();
    }
  }
  get isPerfInsightsOpened(): boolean {
    return this._isPerfInsightsOpened;
  }
 
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

 


      this.getDataForStatCards()
      this.getDataForOverallEfficiencyandEffectivenessDntChart()
      this.getDataForEfficiencyDstriandEffectivenessDistri()
      this.getDataForIssueandInquiryTypes()
      this.getDataForIssuenadInquiryByProducts()
      this.getDataForEfficiencyByEmaiAcss()
      this.getOverdueIssuesdata()

      
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

  this.getDataForStatCards()
  this.getDataForOverallEfficiencyandEffectivenessDntChart()
  this.getDataForEfficiencyDstriandEffectivenessDistri()
  this.getDataForIssueandInquiryTypes()
  this.getDataForIssuenadInquiryByProducts()
  this.getDataForEfficiencyByEmaiAcss()
  this.getOverdueIssuesdata()

}

unsubscribeAll(){
  this.statCardsSubscription?.unsubscribe();
  this.DataForEffiandEffecIssuesSubscription?.unsubscribe();
  this.DataForEffiandEffecInquiriesSubscription?.unsubscribe();
  this.CurrentOverallEfficiencyandEffectivenessSubscription?.unsubscribe();
  this.DataForIssueandInquiryTypesSubscription?.unsubscribe();
  this.DataForProductsByIssueandInquirySubscription?.unsubscribe();
  this.DataForEfficiencyByEmailAccSubscription?.unsubscribe();
  this.BestPerformingEmailSubscription?.unsubscribe();
  this.OverdueIssuesdataSubscription?.unsubscribe();
}

getDataForStatCards(){
  
  this.statCardsSubscription =  this.dataService.getDataForStatCards(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: OngoingAndClosedStatsResponse) => {
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


  this.CurrentOverallEfficiencyandEffectivenessSubscription = this.dataService.getCurrentOverallEfficiencyandEffectiveness(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: OverallyEfficiencyEffectivenessPecentagesResponse) => {
    console.log("data for overall efficiency and effectiveness", data)
    this.dntChartDataOverallEfficiency = [0,0,40,60]
    this.dntChartOverallEfficiencyLabels= data.efficiency_categories.reverse()
    this.dntChartDataOverallEffeftiveness= [0,0,30,70]
    this.dntChartOverallEffectivenessLabels = data.effectiveness_categories.reverse()

    this.isLoadingDCOverallEfficiency = false
    this.isLoadingDCOverallEffectiveness = false

       
   });
}

getDataForEfficiencyDstriandEffectivenessDistri(){
   
  let effi_issue_data: number[] = [] 
  let effec_issue_date: number[] = []
  this.DataForEffiandEffecIssuesSubscription = this.dataService.getDataForEffiandEffecIssues(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: IssuesByEfficiencyEffectivenessResponse) => {
    console.log("data for efficency and effectiveness of ISSUES DISTRIBUTION", data)

    effi_issue_data = data.efficiency_frequencies
    effec_issue_date = data.effectiveness_frequencies

       
   });

   this.DataForEffiandEffecInquiriesSubscription = this.dataService.getDataForEffiandEffecInquiries(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: InquiriesByEfficiencyEffectivenessResponse) => {
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
  
 
  this.DataForIssueandInquiryTypesSubscription = this.dataService.getDataForIssueandInquiryTypes(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: IssueInquiryFreqByTypeResponse) => {
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

getDataForEfficiencyByEmaiAcss(){

  
  this.DataForEfficiencyByEmailAccSubscription = this.dataService.getDataForEfficiencyByEmailAcc(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: EmailAccEfficiencyResponse) => {
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


  this.BestPerformingEmailSubscription = this.dataService.getBestPerformingEmail(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: BestPerformingEmailAccResponse) => {
    console.log("best performing email account", data)
 
    this.bestEmail = data.best_performing_email_acc
    this.isLoadingBestPerfEmail = false
  
       
   });
}


getOverdueIssuesdata(){
  

  this.OverdueIssuesdataSubscription = this.dataService.getOverdueIssuesdata(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: OverdueIssuesResponse) => {
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
