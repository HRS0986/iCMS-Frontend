import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionsComponent } from "./components/permissions/permissions.component";
import { RoleManagementComponent } from "./components/role-management/role-management.component";
import { UsersComponent } from "./components/users/users.component";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "role-management",
    component: RoleManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutingModule {}
