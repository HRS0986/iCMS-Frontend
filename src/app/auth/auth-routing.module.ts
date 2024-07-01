import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "./components/signup/signup.component";
import {SigninComponent} from "./components/signin/signin.component";
import {SignoutComponent} from "./components/signout/signout.component";
import {NgModule} from "@angular/core";
import {NewPasswordComponent} from "./components/new-password/new-password.component";
import {AuthGuardService} from "../shared/shared-services/auth-guard.service";


const routes: Routes =[
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signout",
    component: SignoutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "new-password",
    component: NewPasswordComponent,
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
