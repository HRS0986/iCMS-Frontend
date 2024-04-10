import { Component } from '@angular/core';

@Component({
  selector: 'progress-bar-campaign',
  templateUrl: './progress-bar-campaign.component.html',
  styleUrl: './progress-bar-campaign.component.scss'
})
export class ProgressBarCampaignComponent {
v:number= 50;

 getColor(): string {
  if (this.v <20) {
    return 'red';
  } else if(this.v <=35){
    return 'orange';
  }else if(this.v<=50){
    return 'yellow';
  }else if(this.v<=75){
    return 'light green';
  }else{
    return 'green';
  }

  }
}



