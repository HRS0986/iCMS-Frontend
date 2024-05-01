import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from "./shared-components/page-header/page-header.component";
import { SidenavComponent } from "./shared-components/sidenav/sidenav.component";
import { PanelMenuModule } from "primeng/panelmenu";
import { PanelModule } from "primeng/panel";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { DividerModule } from "primeng/divider";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { TopMenuComponent } from './shared-components/top-menu/top-menu.component';
import { HttpClientModule } from '@angular/common/http';
import {SidebarModule} from "primeng/sidebar";
import { WordcloudComponent } from './shared-components/wordcloud/wordcloud.component';
import { ChartModule } from "primeng/chart";
import { RightSidebarComponent } from './shared-components/right-sidebar/right-sidebar.component';
import { WidgetsBarComponent } from './shared-components/right-sidebar/widgets-bar/widgets-bar.component';
import { AddMemberBarComponent } from './shared-components/right-sidebar/add-member-bar/add-member-bar.component';
import { AddchartComponent } from './shared-components/right-sidebar/widgets-bar/addchart/addchart.component';
import {InputTextModule} from "primeng/inputtext";
import {FieldsetModule} from "primeng/fieldset";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {DropdownModule} from "primeng/dropdown";
import { CreateButtonComponent } from './shared-components/right-sidebar/widgets-bar/addchart/create-button/create-button.component';
import { WidgetsSettingsComponent } from './shared-components/right-sidebar/widgets-bar/addchart/widgets-settings/widgets-settings.component';
import { InputDataComponent } from './shared-components/right-sidebar/widgets-bar/addchart/input-data/input-data.component';



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
    CreateButtonComponent,
    WidgetsSettingsComponent,
    InputDataComponent
  ],
  exports: [
    PageHeaderComponent,
    SidenavComponent,
    TopMenuComponent,
    WordcloudComponent
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
  ]

})
export class SharedModule {
}
