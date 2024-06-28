import { Component } from '@angular/core';
import { ChartsService } from '../../../../../main-dashboard/services/charts.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthendicationService } from '../../../../../main-dashboard/services/authendication.service';

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

  barChartXAxisOptions = [
    { label: 'Topics', value: 'topics' }
  ];

  barChartYAxisOptions = [
    { label: 'Sentiment Count', value: 'sentiment-count' }
  ];

  topicsOptions = [
    { label: 'Health', value: 'health' },
    { label: 'Technology', value: 'technology' },
    { label: 'Education', value: 'education' }
  ];

  sources = [
    { name: 'email', code: 'email' },
    { name: 'social', code: 'social' },
    { name: 'call', code: 'call' }
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
    private authService: AuthendicationService
  ) {
    this.sidebarVisible = false;
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
    this.change=false;
    const sourceNames = this.selectedCities.map((source: any) => source.name);
    const keywordNames = this.selectedKeywords.map((keyword: any) => keyword.name);

    const widgetData = {
      title: this.title,
      chartType: this.selectedChartType,
      xAxis: this.selectedXAxis,
      yAxis: this.selectedYAxis,
      topics: this.selectedTopics,
      sources: sourceNames,
      keywords: keywordNames,
      grid: { cols: 5, rows: 3, x: 0, y: 4 }
    };


    this.chartService.newWidget(widgetData).subscribe(
            (counts: any) => {
             
            }
          );
  }
  
  showDialog(){
    this.change=true;
  }


}
