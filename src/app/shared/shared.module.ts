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


@NgModule({
  declarations: [
    PageHeaderComponent,
    SidenavComponent,
    TopMenuComponent,
    WordcloudComponent,
    WordcloudComponent
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
    ]

})
export class SharedModule {
}
