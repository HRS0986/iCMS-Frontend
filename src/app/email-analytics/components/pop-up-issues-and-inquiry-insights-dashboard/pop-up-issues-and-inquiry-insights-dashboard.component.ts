import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { InquiriesByEfficiencyEffectivenessResponse, IssueInquiryFreqByProdcuts, IssueInquiryFreqByTypeResponse, IssuesByEfficiencyEffectivenessResponse, OngoingAndClosedStatsResponse, OverdueIssuesResponse, StatCard } from '../../interfaces/dashboard';
import { DataService } from '../../services/pop-up-issues-and-inquiry-insights-dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pop-up-issues-and-inquiry-insights-dashboard',
  templateUrl: './pop-up-issues-and-inquiry-insights-dashboard.component.html',
  styleUrl: './pop-up-issues-and-inquiry-insights-dashboard.component.scss'
})
export class PopUpIssuesAndInquiryInsightsDashboardComponent {

  @Input() intervalInDaysStart!: number;
  @Input() intervalInDaysEnd!: number;

  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Dashboard"},
    {label: "Issues and Inquiries insights"}
  ];


  // calenders

  rangeDates: Date[] | undefined;
  
  fromDate: Date | undefined;
  toDate: Date | undefined;

  minDate: Date = new Date();
  maxDate: Date = new Date();
    
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


  overallOverdueIssuesHeader!: string
  overallOverdueIssuesContent!: string
  noOfOverdueIssuesColor = 'var(--red-400)'
  isLoadingoverallOverdueIssuesCount: boolean = true





  documentStyle = getComputedStyle(document.documentElement);

  private statCardsSubscription: Subscription | undefined;
  private DataForEffiandEffecIssuesSubscription: Subscription | undefined;
  private DataForEffiandEffecInquiriesSubscription: Subscription | undefined;
  private DataForIssueandInquiryTypesSubscription: Subscription | undefined;
  private DataForProductsByIssueandInquirySubscription: Subscription | undefined;
  private OverdueIssuesdataSubscription: Subscription | undefined;
  
  isLoadingStatcards : boolean = true;

   // stat cards inputs
  statsData: StatCard[] = [ { title: 0, sub_title: 'total', header: 'Ongoing', subheader: 'issues', fontColor:this.documentStyle.getPropertyValue('--negative-color')},
    { title: 0, sub_title: 'total', header: 'Closed', subheader: 'issues', fontColor:this.documentStyle.getPropertyValue('--positive-color')},
    { title: 0, sub_title: 'total', header: 'Ongoing', subheader: 'inquiries', fontColor:this.documentStyle.getPropertyValue('--negative-color')},
    { title: 0, sub_title: 'total', header: 'Closed', subheader: 'inquiries', fontColor:this.documentStyle.getPropertyValue('--positive-color')}];
 
 
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

      this.subscribeALL();

      
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['intervalInDaysStart'] || changes['intervalInDaysEnd']) {
      this.unsubscribeAll();
      this.subscribeALL();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  
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
  this.subscribeALL();
}

subscribeALL(){
  this.getDataForStatCards();
  this.getDataForEfficiencyDstriandEffectivenessDistri();
  this.getDataForIssueandInquiryTypes();
  this.getDataForIssuenadInquiryByProducts();
  this.getOverdueIssuesdata();
}

unsubscribeAll(){
  this.statCardsSubscription?.unsubscribe();
  this.DataForEffiandEffecIssuesSubscription?.unsubscribe();
  this.DataForEffiandEffecInquiriesSubscription?.unsubscribe();
  this.DataForIssueandInquiryTypesSubscription?.unsubscribe();
  this.DataForProductsByIssueandInquirySubscription?.unsubscribe();
  this.OverdueIssuesdataSubscription?.unsubscribe();

}


getDataForStatCards(){
  this.isLoadingStatcards = true
  this.statCardsSubscription = this.dataService.getDataForStatCards(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: OngoingAndClosedStatsResponse) => {
  console.log(data)


  this.statsData[0].title = data.count_total_ongoing_issues
  this.statsData[1].title = data.count_total_closed_issues
  this.statsData[2].title = data.count_total_ongoing_inquiries
  this.statsData[3].title = data.count_total_closed_inquiries
  this.isLoadingStatcards = false
     
 });

 

}


getDataForEfficiencyDstriandEffectivenessDistri(){

  this.isLoadingEffiDistri = true
  this.isLoadingEffectDistri = true
   
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
  
  this.isLoadingIssueTypes = true
  this.isLoadingInquiryTypes =  true
 
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

    this.isLoadingProductdistriOfIssuesnInquirires = false



  });


}




getOverdueIssuesdata(){
  
  this.isLoadingoverallOverdueIssuesCount = true

  this.OverdueIssuesdataSubscription = this.dataService.getOverdueIssuesdata(this.intervalInDaysStart, this.intervalInDaysEnd).subscribe((data: OverdueIssuesResponse) => {
    console.log("overdue issues related DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa", data)
 
    this.overallOverdueIssuesHeader = `${data.sum_overdue_issues} OVERDUE ISSUES recorded`
    this.overallOverdueIssuesContent = `out of ${data.total_ongoing_issues} ongoing issues `
    this.isLoadingoverallOverdueIssuesCount = false
    
  
       
   });
}

}
