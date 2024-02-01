import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAnalyticsRoutingModule } from './call-analytics-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CallAnalyticsRoutingModule,
    SharedModule,
  ]
})
export class CallAnalyticsModule { }
