import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import {AuthRoutingModule} from "./auth-routing.module";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import {ToastModule} from "primeng/toast";
import { NewPasswordComponent } from './components/new-password/new-password.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    SignoutComponent,
    NewPasswordComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        PasswordModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        ToastModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
