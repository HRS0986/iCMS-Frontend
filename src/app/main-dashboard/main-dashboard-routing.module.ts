import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import { NotificationsComponent } from './components/notifications/notifications.component';
import {GridComponent} from "./components/grid/grid.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },{
    path: "grid",
    component: GridComponent
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "profile",
    component: UserProfileComponent
  }
  ,
  {
    path: "notifications",
    component: NotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDashboardRoutingModule { }
