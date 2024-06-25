import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryCardsContainerComponent } from './components/summary-cards-container/summary-cards-container.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailFilteringComponent } from './components/email-filtering/email-filtering.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { SuggestionFilteringComponent } from './components/suggestion-filtering/suggestion-filtering.component';
import { IssueDataviewComponent } from './components/issue-dataview/issue-dataview.component';
import { InquiryDataviewComponent } from './components/inquiry-dataview/inquiry-dataview.component';
import { conditionGuard } from './condition.guard';
import {AuthorizationMessageComponent} from './components/authorization-message/authorization-message.component'
import { AuthGuardService } from '../shared/shared-services/auth-guard.service';

const routes: Routes = [
  {
    path: "dashboard1",
    component: DashboardComponent,
    canActivate: [conditionGuard,AuthGuardService] 
  },
  {
    path: "dashboard2",
    component: Dashboard2Component,
    canActivate: [conditionGuard,AuthGuardService]
  },
  {
    path: "summaries",
    component: SummaryCardsContainerComponent,
    canActivate: [conditionGuard,AuthGuardService]
  },
  {
    path: "suggestions",
    component: SuggestionFilteringComponent,
    canActivate: [conditionGuard,AuthGuardService]
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [conditionGuard,AuthGuardService]
  },
  { path: "authorization-component", 
    component: AuthorizationMessageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailAnalyticsRoutingModule {
}