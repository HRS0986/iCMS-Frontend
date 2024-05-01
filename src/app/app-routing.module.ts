import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "call",
    loadChildren: () => import("./call-analytics/call-analytics.module").then(m => m.CallAnalyticsModule)
  },
  {
    path: "email",
    loadChildren: () => import("./email-analytics/email-analytics.module").then(m => m.EmailAnalyticsModule)
  },
  {
    path: "social-media",
    loadChildren: () => import("./social-media-analytics/social-media-analytics.module").then(m => m.SMAnalyticsModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "main-dashboard",
    loadChildren: () => import("./main-dashboard/main-dashboard.module").then(m => m.MainDashboardModule)
  },
  {
    path:"profile",
    loadChildren: () => import("./main-dashboard/main-dashboard.module").then(m => m.MainDashboardModule)
  },
  {
    path: "app-settings",
    loadChildren: () => import("./app-settings/app-settings.module").then(m => m.AppSettingsModule)
  },
  {
    path: "",
    redirectTo: "main-dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
