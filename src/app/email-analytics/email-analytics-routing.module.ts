import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryCardsContainerComponent } from './components/summary-cards-container/summary-cards-container.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailFilteringComponent } from './components/email-filtering/email-filtering.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "summaries",
    component: SummaryCardsContainerComponent
  },
  {
    path: "filtering",
    component: EmailFilteringComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailAnalyticsRoutingModule {
}