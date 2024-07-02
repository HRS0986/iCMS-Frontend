import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from "./shared-components/page-header/page-header.component";
import { SidenavComponent } from "./shared-components/sidenav/sidenav.component";
import { PanelMenuModule } from "primeng/panelmenu";
import { PanelModule } from "primeng/panel";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { DividerModule } from "primeng/divider";
import { CalendarModule } from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TopMenuComponent } from './shared-components/top-menu/top-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from "primeng/sidebar";
import { WordcloudComponent } from './shared-components/wordcloud/wordcloud.component';
import { ChartModule } from "primeng/chart";
import { RightSidebarComponent } from './shared-components/right-sidebar/right-sidebar.component';
import { WidgetsBarComponent } from './shared-components/right-sidebar/widgets-bar/widgets-bar.component';
import { AddMemberBarComponent } from './shared-components/right-sidebar/add-member-bar/add-member-bar.component';
import { AddchartComponent } from './shared-components/right-sidebar/widgets-bar/addchart/addchart.component';
import { InputTextModule } from "primeng/inputtext";
import { FieldsetModule } from "primeng/fieldset";
import { CardModule } from "primeng/card";
import { ImageModule } from "primeng/image";
import { DropdownModule } from "primeng/dropdown";
import { SelectButtonModule } from "primeng/selectbutton";
import { MultiSelectModule } from "primeng/multiselect";
import { PageNotFoundComponent } from './shared-components/page-not-found/page-not-found.component';
import { AddRoleBarComponent } from './shared-components/right-sidebar/add-role-bar/add-role-bar.component'
import {InputSwitchModule} from "primeng/inputswitch";
import {CheckboxModule} from "primeng/checkbox";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ToastModule} from "primeng/toast";
import { ViewUserComponent } from './shared-components/right-sidebar/view-user/view-user.component';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from "primeng/skeleton";

@NgModule({
  declarations: [
    PageHeaderComponent,
    SidenavComponent,
    TopMenuComponent,
    WordcloudComponent,
    WordcloudComponent,
    RightSidebarComponent,
    WidgetsBarComponent,
    AddMemberBarComponent,
    AddchartComponent,
    PageNotFoundComponent,
    AddRoleBarComponent,
    ViewUserComponent,

  ],
  exports: [
    PageHeaderComponent,
    SidenavComponent,
    TopMenuComponent,
    WordcloudComponent,
  ],
    imports: [
        CommonModule,
        PanelMenuModule,
        PanelModule,
        BreadcrumbModule,
        DividerModule,
        CalendarModule,
        FormsModule,
        HttpClientModule,
        SidebarModule,
        ChartModule,
        InputTextModule,
        FieldsetModule,
        CardModule,
        ImageModule,
        DropdownModule,
        SelectButtonModule,
        MultiSelectModule,
        ReactiveFormsModule,
        InputSwitchModule,
        CheckboxModule,
        InputGroupModule,
        InputGroupAddonModule,
        ToastModule,
        OverlayPanelModule,
        DialogModule,
        SkeletonModule
    ],

})
export class SharedModule {
}
