import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AuthGuardService } from '../shared/shared-services/auth-guard.service';

const routes: Routes = [
  {
    path: "dashboard",
    canActivate: [AuthGuardService],
    component: DashboardComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "profile",
    canActivate: [AuthGuardService],
    component: UserProfileComponent
  }
  ,
  {
    path: "notifications",
    canActivate: [AuthGuardService],
    component: NotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDashboardRoutingModule { }
