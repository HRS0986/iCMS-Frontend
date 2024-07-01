import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import {ChartModule} from "primeng/chart";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/user-profile/edit-profile/edit-profile.component';
import { UserNotificationComponent } from './components/user-profile/user-notification/user-notification.component';
import { UserSecurityComponent } from './components/user-profile/user-security/user-security.component';
import {TabViewModule} from "primeng/tabview";
import {SharedModule} from "../shared/shared.module";
import {ButtonModule} from "primeng/button";
import {ImageModule} from "primeng/image";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputSwitchModule} from "primeng/inputswitch";
import {PasswordModule} from "primeng/password";
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UnreadNotificationsComponent } from './components/notifications/unread-notifications/unread-notifications.component';
import { ReadNotificationsComponent } from './components/notifications/read-notifications/read-notifications.component';
import {PanelModule} from "primeng/panel";
import {LineAreaChartComponent} from "./components/charts/line-area-chart/line-area-chart.component";
import {HorizontalBarChartComponent} from "./components/charts/horizontal-bar-chart/horizontal-bar-chart.component";
import {GaugeChartComponent} from "./components/charts/gauge-chart/gauge-chart.component";
import { NgxEchartsModule } from 'ngx-echarts';
import { WordcloudComponent } from './components/charts/wordcloud/word-cloud.component';
import { GridComponent } from './components/grid/grid.component';
import {GridsterComponent, GridsterItemComponent} from "angular-gridster2";
import {MatIcon} from "@angular/material/icon";
import {FileUploadModule} from "primeng/fileupload";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import { VerticalBerChartComponent } from './components/charts/vertical-ber-chart/vertical-ber-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import {PanelMenuModule} from "primeng/panelmenu";
import {MenubarModule} from "primeng/menubar";
import {SkeletonModule} from "primeng/skeleton";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    DashboardComponent,
    DoughnutChartComponent,
    LineAreaChartComponent,
    UserProfileComponent,
    EditProfileComponent,
    UserNotificationComponent,
    UserSecurityComponent,
    NotificationsComponent,
    UnreadNotificationsComponent,
    ReadNotificationsComponent,
    HorizontalBarChartComponent,
    GaugeChartComponent,
    GridComponent,
    WordcloudComponent,
    VerticalBerChartComponent,
    BarChartComponent

  ],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    ChartModule,
    TabViewModule,
    SharedModule,
    ButtonModule,
    ImageModule,
    FormsModule,
    InputTextModule,
    InputSwitchModule,
    PasswordModule,
    HttpClientModule,
    MessagesModule,
    ConfirmPopupModule,
    ToastModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule,
    PanelModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    GridsterItemComponent,
    GridsterComponent,
    MatIcon,
    FileUploadModule,
    MatIconButton,
    MatMiniFabButton,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    MenuModule,
    CardModule,
    OverlayPanelModule,
    TableModule,
    PanelMenuModule,
    MenubarModule,
    SkeletonModule,
    RippleModule,

  ],
  exports: [
    LineAreaChartComponent, // Ensure this component is exported
  ],
  providers:[ConfirmationService]
})
export class MainDashboardModule { }
