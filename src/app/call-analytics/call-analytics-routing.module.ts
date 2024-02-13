import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CallRecordingsComponent } from './components/call-recordings/call-recordings.component';
import { MenuItem } from 'primeng/api';
import { FileUploadComponent } from './components/file-upload/file-upload.component';


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
    path: "callrecordingsupload",
    component: FileUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallAnalyticsRoutingModule {
}
