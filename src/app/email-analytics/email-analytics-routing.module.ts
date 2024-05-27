import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryCardsContainerComponent } from './components/summary-cards-container/summary-cards-container.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailFilteringComponent } from './components/email-filtering/email-filtering.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { SuggestionFilteringComponent } from './components/suggestion-filtering/suggestion-filtering.component';

const routes: Routes = [
  {
    path: "dashboard1",
    component: DashboardComponent
  },
  {
    path: "dashboard2",
    component: Dashboard2Component
  },
  {
    path: "summaries",
    component: SummaryCardsContainerComponent
  },
  {
    path: "suggestions",
    component: SuggestionFilteringComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailAnalyticsRoutingModule {
}