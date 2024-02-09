import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CallRecordingsComponent } from './components/call-recordings/call-recordings.component';
import { MenuItem } from 'primeng/api';


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "callrecordings",
    component: CallRecordingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallAnalyticsRoutingModule {
}
