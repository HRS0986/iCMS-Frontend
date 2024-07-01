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
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from "primeng/api";
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { MainDashboardModule } from './main-dashboard/main-dashboard.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';





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
    MultiSelectModule,
    HttpClientModule,
    MessagesModule,
    ConfirmPopupModule,
    ToastModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    MainDashboardModule,
    OverlayPanelModule
  ],

  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
