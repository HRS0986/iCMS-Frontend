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
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
