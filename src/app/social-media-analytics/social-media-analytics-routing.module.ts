import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CAComponent } from "./pages/campaign-analysis/ca.component";
import { PIComponent } from "./pages/platform-insights/pi.component";
import { settingsComponent } from "./pages/settings/settings.component";

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