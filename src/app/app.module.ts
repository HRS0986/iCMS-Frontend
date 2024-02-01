import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './shared-components/sidenav/sidenav.component';
import {SidebarModule} from "primeng/sidebar";
import {PanelModule} from "primeng/panel";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PanelMenuModule} from "primeng/panelmenu";
import { PageHeaderComponent } from './shared-components/page-header/page-header.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    PanelModule,
    ButtonModule,
    CardModule,
    PanelMenuModule,
    BreadcrumbModule,
    CalendarModule,
    FormsModule,
    DividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
