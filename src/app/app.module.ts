import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { SharedModule } from './shared/shared.module';
import { MessageService } from "primeng/api";


@NgModule({
  declarations: [AppComponent],
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
    DividerModule,
    SharedModule,

  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
