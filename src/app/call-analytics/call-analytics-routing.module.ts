import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CallRecordingsComponent } from './components/call-recordings/call-recordings.component';
import { CallFilteringComponent } from './components/call-filtering/call-filtering.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "recordings",
    component: CallRecordingsComponent
  },
  {
    path: "filtering",
    component: CallFilteringComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallAnalyticsRoutingModule {
}
