import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CAComponent } from "./components/campaign-analysis/ca.component";
import { PIComponent } from "./components/platform-insights/pi.component";
import { settingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "settings",
    component: settingsComponent
  },
  {
    path: "platform-insights",
    component: PIComponent
  },
  {
    path: "campaign-analysis",
    component: CAComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SMAnalyticsRoutingModule {
}