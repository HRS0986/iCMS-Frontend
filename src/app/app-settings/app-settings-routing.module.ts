import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UsersComponent} from "./components/users/users.component";
import {PermissionsComponent} from "./components/permissions/permissions.component";

const routes: Routes =[
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "permissions",
    component: PermissionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSettingsRoutingModule {
}
