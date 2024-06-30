import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SettingsComponent } from './components/settings/settings.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { SuggestionFilteringComponent } from './components/suggestion-filtering/suggestion-filtering.component';
import { IssueDataviewComponent } from './components/issue-dataview/issue-dataview.component';
import { InquiryDataviewComponent } from './components/inquiry-dataview/inquiry-dataview.component';

import { conditionGuard } from './condition.guard';
import {AuthorizationMessageComponent} from './components/authorization-message/authorization-message.component'
import { AuthGuardService } from '../shared/shared-services/auth-guard.service';

import { ThreadDataviewComponent } from './components/thread-dataview/thread-dataview.component';


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
    component: ThreadDataviewComponent,
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

  { path: "permission", 
    component: AuthorizationMessageComponent },

  {
    path: "issues",
    component: IssueDataviewComponent,
    canActivate: [conditionGuard,AuthGuardService]
  },
  {
    path: "inquiries",
    component: InquiryDataviewComponent,
    canActivate: [conditionGuard,AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailAnalyticsRoutingModule {
}