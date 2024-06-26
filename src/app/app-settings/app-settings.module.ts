import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppSettingsRoutingModule} from "./app-settings-routing.module";
import { UsersComponent } from './components/users/users.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SliderModule} from "primeng/slider";
import {TagModule} from "primeng/tag";
import {FileUploadModule} from "primeng/fileupload";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {SharedModule} from "../shared/shared.module";
import { AddUserPopupComponent } from './components/users/add-user-popup/add-user-popup.component';
import {SidebarModule} from "primeng/sidebar";
import {TabViewModule} from "primeng/tabview";
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { AddRolePopupComponent } from './components/role-management/add-role-popup/add-role-popup.component';
import {SplitButtonModule} from "primeng/splitbutton";


@NgModule({
  declarations: [
    UsersComponent,
    PermissionsComponent,
    AddUserPopupComponent,
    PermissionsComponent,
    RoleManagementComponent,
    AddRolePopupComponent,

  ],
  imports: [
    CommonModule,
    AppSettingsRoutingModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    SliderModule,
    TagModule,
    FileUploadModule,
    DropdownModule,
    ChipsModule,
    SharedModule,
    SidebarModule,
    TabViewModule,
    ReactiveFormsModule,
    SplitButtonModule,

  ]
})
export class AppSettingsModule { }
