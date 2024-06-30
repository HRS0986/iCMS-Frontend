import { Component } from '@angular/core';
import { ChartsService } from '../../../../../main-dashboard/services/charts.service';
import { CookieService } from 'ngx-cookie-service';
// import { AuthendicationService } from '../../../../../main-dashboard/services/authendication.service';
import { AuthenticationService } from '../../../../../auth/services/authentication.service';
@Component({
  selector: 'app-addchart',
  templateUrl: './addchart.component.html',
  styleUrls: ['./addchart.component.scss']
})

export class AddchartComponent {

  title: string | undefined;
  sidebarVisible: boolean;
  selectedChartType: string | null = null;
  selectedXAxis: string | null = null;
  selectedYAxis: string | null = null;
  wordselectedYAxis:string | null =null;
  selectedTopics: string[] = [];
  selectedCities: any;
  selectedKeywords: any;
  change:boolean=false;

  
  members: Array<{ name: string; email: string; role: string; image: string }> = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', image: 'avatar1.png' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Member', image: 'avatar2.png' },
    { name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Viewer', image: 'avatar3.png' }
  ];

  stateOptions = [
    { label: 'Line Chart', value: 'line-chart', icon: 'pi pi-chart-line' },
    { label: 'Bar Chart', value: 'bar-chart', icon: 'pi pi-chart-bar' },
    { label: 'Horizontal Bar Chart', value: 'horizontal-bar-chart', icon: 'pi pi-chart-bar' },
    { label: 'Pie Chart', value: 'pie-chart', icon: 'pi pi-chart-pie' },
    { label: 'Word Cloud', value: 'word-cloud', icon: 'pi pi-slack' },
    { label: 'Table', value: 'table', icon: 'pi pi-table' }
  ];

  lineChartXAxisOptions = [
    { label: 'Date', value: 'date' }
  ];

  lineChartYAxisOptions = [
    { label: 'Total Sources Score', value: 'score' },
    { label: 'Sentiment Count', value: 'sentiment-count' },
    { label: 'Source with Score', value: 'sources' }
  ];

  wordYAxisOptions = [
    { label: 'Topics', value: 'topics' },
    { label: 'Keywords', value: 'keywords' },
    { label: 'Products', value: 'products' },
  ];

  barChartXAxisOptions = [
    { label: 'Topics', value: 'topics' }
  ];

  barChartYAxisOptions = [
    { label: 'Sentiment Count', value: 'sentiment-count' },
  ];

  pieYAxisOptions = [
    { label: 'Sentiment Count', value: 'sentiment-count' },

  ];

  emailBarChartYAxisOptions = [
    { label: 'Status', value: 'status' },
  ];

  horizontalChartYAxisOptions = [
    { label: 'Counts', value: 'counts' },
  ];

  topicsOptions = [
    { label: 'Topics', value: 'topics' },
    { label: 'Issues', value: 'issues' },
    { label: 'Inquires', value: 'inquries' },
    { label: 'Keywords', value: 'keywords' },
  ];



  allSources = [
    { name: 'email', code: 'email' },
    { name: 'social', code: 'social' },
    { name: 'call', code: 'call' }
  ];

  emailCallSources = [
    { name: 'email', code: 'email' },
    { name: 'call', code: 'call' }
  ];

  socialCallSources = [
    { name: 'social', code: 'social' },
    { name: 'call', code: 'call' }
  ];

  emailSocialSources = [
    { name: 'social', code: 'social' },
    { name: 'email', code: 'email' }
  ];

  emailSource = [
    { name: 'email', code: 'email' }
  ];

  callSource = [
    { name: 'call', code: 'call' }
  ];

  socialSource = [
    { name: 'social', code: 'social' }
  ];

  keywords = [
    { id: 1, name: 'keyword1' },
    { id: 2, name: 'keyword2' },
    { id: 3, name: 'keyword3' },
    { id: 4, name: 'keyword4' },
    { id: 5, name: 'keyword5' },
    { id: 6, name: 'keyword6' },
    { id: 7, name: 'keyword7' },
    { id: 8, name: 'keyword8' },
    { id: 9, name: 'keyword9' },
    { id: 10, name: 'keyword10' }
  ];

  constructor(
    private chartService: ChartsService,
    private cookieService: CookieService,
    private authService: AuthenticationService
  ) {
    this.sidebarVisible = false;
  }

  hasEmailInSelectedCities(): any[] {
    return this.selectedCities.some((city: any) => city.name);
  }

  onChartTypeChange(chartType: string) {
    this.change=false;
    this.selectedChartType = chartType;
    this.selectedXAxis = null; // Reset x-axis selection when chart type changes
    this.selectedYAxis = null; // Reset y-axis selection when chart type changes
    this.selectedTopics = []; // Reset topics selection when chart type changes
  }

  onXAxisChange(xAxis: string) {
    this.change=false;
    this.selectedXAxis = xAxis;
    this.selectedTopics = []; // Reset topics selection when x-axis changes
  }




  saveWidget() {
    const gridConfigurations: any = {
      'Line Chart': { cols: 6, rows: 4, x: 0, y: 0 },
      'Bar Chart': { cols: 5, rows: 3, x: 1, y: 1 },
      'Horizontal Bar Chart': { cols: 7, rows: 3, x: 2, y: 2 },
      'Pie Chart': { cols: 4, rows: 4, x: 3, y: 3 },
      'Word Cloud': { cols: 5, rows: 3, x: 0, y: 4 },
      'Table': { cols: 8, rows: 5, x: 4, y: 0 }
    };

    this.change = false;
    const sourceNames = this.selectedCities.map((source: any) => source.name);
    
    const keywordNames = this.selectedKeywords ? this.selectedKeywords.map((keyword: any) => keyword.name) : [];

    const selectedChartType: string = this.selectedChartType || 'Line Chart';

    // Ensure selectedChartType is not null or undefined
    let gridConfig= { cols: 5, rows: 3, x: 0, y: 0 }; // default grid configuration
    if (selectedChartType && gridConfigurations[selectedChartType]) {
      gridConfig = gridConfigurations[selectedChartType];
    }

    const widgetData = {
      title: this.title,
      chartType: selectedChartType,
      xAxis: this.selectedXAxis,
      yAxis: this.selectedYAxis,
      topics: this.selectedTopics,
      sources: sourceNames,
      keywords: keywordNames,
      grid: gridConfig,
      status:'show'
    };


    this.authService.getIdToken().subscribe((token) =>{
    this.chartService.newWidget(token,widgetData).subscribe(
      (response: any) => {
        if (response.success === true) {
          this.selectedCities=[];
        }
      }
    );
  });
  }
  
  showDialog(){
    this.change=true;
  }


}
