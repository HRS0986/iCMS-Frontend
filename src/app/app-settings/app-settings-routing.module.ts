import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionsComponent } from "./components/permissions/permissions.component";
import { RoleManagementComponent } from "./components/role-management/role-management.component";
import { UsersComponent } from "./components/users/users.component";
import {AuthGuardService} from "../shared/shared-services/auth-guard.service";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "role-management",
    component: RoleManagementComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutingModule {}
