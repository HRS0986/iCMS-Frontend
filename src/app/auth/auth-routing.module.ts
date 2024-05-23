import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "./components/signup/signup.component";
import {SigninComponent} from "./components/signin/signin.component";
import {SignoutComponent} from "./components/signout/signout.component";
import {NgModule} from "@angular/core";


const routes: Routes =[
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signout",
    component: SignoutComponent
  },
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
