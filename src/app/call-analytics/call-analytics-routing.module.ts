import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CallRecordingsComponent } from './components/call-recordings/call-recordings.component';
import { CallFilteringComponent } from './components/call-filtering/call-filtering.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CallOperatorsComponent } from "./components/call-operators/call-operators.component";
import {AuthGuardService} from "../shared/shared-services/auth-guard.service";


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: "recordings",
    component: CallRecordingsComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: "filtering",
    component: CallFilteringComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: "upload",
    component: FileUploadComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: "operators",
    component: CallOperatorsComponent,
    // canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallAnalyticsRoutingModule {}
