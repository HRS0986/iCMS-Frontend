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


@NgModule({
  declarations: [
    PageHeaderComponent,
    SidenavComponent,
    TopMenuComponent
  ],
  exports: [
    PageHeaderComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    PanelModule,
    BreadcrumbModule,
    DividerModule,
    CalendarModule,
    FormsModule
  ]
})
export class SharedModule {
}
