import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-overall-progress',
  templateUrl: './dashboard-overall-progress.component.html',
  styleUrl: './dashboard-overall-progress.component.scss'
})
export class DashboardOverallProgressComponent {
  dataEfficiency: any;
  dataEffectivity: any;
  dataProgress: any;

  optionsDefault: any;
  optionsProgress: any;
  optionsEfficiency: any;
  optionsEffectivity: any;

  dialogVisible: boolean = false;

  popup() {
    this.dialogVisible = true;
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataEfficiency = {
        labels: ['High', 'Moderate', 'Low', 'Poor'],
        datasets: [
            {
                data: [540, 325, 702, 100],
                backgroundColor: [
                  documentStyle.getPropertyValue('--green-500'),
                  documentStyle.getPropertyValue('--blue-500'), 
                  documentStyle.getPropertyValue('--yellow-500'), 
                  documentStyle.getPropertyValue('--red-500'), 
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--green-400'),
                  documentStyle.getPropertyValue('--blue-400'), 
                  documentStyle.getPropertyValue('--yellow-400'), 
                  documentStyle.getPropertyValue('--red-400'), 
                ]
            }
        ]
    };

    this.dataEffectivity = {
        labels: ['High', 'Moderate', 'Low', 'Poor'],
        datasets: [
            {
                data: [540, 325, 702, 100],
                backgroundColor: [
                  documentStyle.getPropertyValue('--green-500'),
                  documentStyle.getPropertyValue('--blue-500'), 
                  documentStyle.getPropertyValue('--yellow-500'), 
                  documentStyle.getPropertyValue('--red-500'), 
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--green-400'),
                  documentStyle.getPropertyValue('--blue-400'), 
                  documentStyle.getPropertyValue('--yellow-400'), 
                  documentStyle.getPropertyValue('--red-400'), 
                ]
            }
        ]
    };

    this.dataProgress = {
      labels: ['Closed', 'Ongoing'],
        datasets: [
            {
                data: [140, 325],
                backgroundColor: [
                  documentStyle.getPropertyValue('--green-500'),
                  documentStyle.getPropertyValue('--blue-500'), 
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--green-400'),
                  documentStyle.getPropertyValue('--blue-400'), 
                ]
            }
        ]
    };

    this.optionsDefault = {
      plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                color: textColor
            },
            position: 'bottom',
        },
        title: {
          display: true,
          color: textColor,
        }
      },
    };

        // this is for shallow copying specific fields. Refer => https://stackoverflow.com/questions/28150967/typescript-cloning-object
        this.optionsProgress = {...this.optionsDefault, plugins: {...this.optionsDefault.plugins, title:{...this.optionsDefault.plugins.title}}};
        this.optionsProgress.plugins.title.text = 'Progress';
    
        this.optionsEfficiency = {...this.optionsDefault, plugins: {...this.optionsDefault.plugins, title:{...this.optionsDefault.plugins.title}}};
        this.optionsEfficiency.plugins.title.text = 'Efficiency';
    
        this.optionsEffectivity = {...this.optionsDefault, plugins: {...this.optionsDefault.plugins, title:{...this.optionsDefault.plugins.title}}};
        this.optionsEffectivity.plugins.title.text = 'Effectiveness';
  }


}
