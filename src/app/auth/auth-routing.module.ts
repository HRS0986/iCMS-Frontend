import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "./components/signup/signup.component";
import {NgModule} from "@angular/core";

const routes: Routes =[
  {
    path: "signup",
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
