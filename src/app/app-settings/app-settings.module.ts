import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppSettingsRoutingModule} from "./app-settings-routing.module";
import { UsersComponent } from './components/users/users.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {SliderModule} from "primeng/slider";
import {TagModule} from "primeng/tag";
import {FileUploadModule} from "primeng/fileupload";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {SharedModule} from "../shared/shared.module";
import { AddUserPopupComponent } from './components/users/add-user-popup/add-user-popup.component';
import {SidebarModule} from "primeng/sidebar";


@NgModule({
  declarations: [
    UsersComponent,
    PermissionsComponent,
    AddUserPopupComponent,

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

    ]
})
export class AppSettingsModule { }
