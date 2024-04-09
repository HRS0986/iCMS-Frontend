import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import {ChartModule} from "primeng/chart";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/user-profile/edit-profile/edit-profile.component';
import { UserNotificationComponent } from './components/user-profile/user-notification/user-notification.component';
import { UserSecurityComponent } from './components/user-profile/user-security/user-security.component';
import {TabViewModule} from "primeng/tabview";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    DashboardComponent,
    DoughnutChartComponent,
    LineChartComponent,
    UserProfileComponent,
    EditProfileComponent,
    UserNotificationComponent,
    UserSecurityComponent,

  ],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    ChartModule,
    TabViewModule,
    SharedModule
  ]
})
export class MainDashboardModule { }
