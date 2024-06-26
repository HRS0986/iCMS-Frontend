import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SettingsComponent } from './components/settings/settings.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { SuggestionFilteringComponent } from './components/suggestion-filtering/suggestion-filtering.component';
import { IssueDataviewComponent } from './components/issue-dataview/issue-dataview.component';
import { InquiryDataviewComponent } from './components/inquiry-dataview/inquiry-dataview.component';
import { ThreadDataviewComponent } from './components/thread-dataview/thread-dataview.component';

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
    component: ThreadDataviewComponent
  },
  {
    path: "suggestions",
    component: SuggestionFilteringComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "issues",
    component: IssueDataviewComponent
  },
  {
    path: "inquiries",
    component: InquiryDataviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailAnalyticsRoutingModule {
}