import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from "primeng/api";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  menuItems!: MenuItem[];
  logoutItems!: MenuItem[];

  ngOnInit() {
    this.logoutItems = [
      {
        label: "Logout",
        icon: "pi pi-fw pi-external-link",
        routerLink: "auth/signout"
      }
    ];

    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-th-large',
        routerLink: "main-dashboard"
      },
      {
        label: 'Email Analytics',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'Dashboard1',
            routerLink: "email/dashboard1",
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Dashboard2',
            routerLink: "email/dashboard2",
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Email Filtering',
            routerLink: "email/filtering",
            icon: 'pi pi-fw pi-filter'
          },
          {
            label: 'Conversation Summaries',
            routerLink: "email/summaries",
            icon: 'pi pi-fw pi-book'
          },
          {
            label: 'Settings',
            routerLink: "email/settings",
            icon: 'pi pi-fw pi-sliders-h'
          }
        ]
      },
      {
        label: 'Call Analytics',
        icon: 'pi pi-fw pi-phone',
        items: [
          {
            label: 'Dashboard',
            routerLink: "call/dashboard",
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Call Recordings',
            routerLink: "call/recordings",
            icon: 'pi pi-fw pi-volume-down'
          },
          {
            label: 'Call Filtering',
            routerLink: "call/filtering",
            icon: 'pi pi-fw pi-filter',
          },
          {
            label: 'Call Operators',
            routerLink: 'call/operators',
            icon: 'pi pi-fw pi-users',
          },
          {
            label: 'Settings',
            routerLink: 'call/settings',
            icon: 'pi pi-fw pi-sliders-h'
          }
        ]
      },
      {
        label: 'Social Media Analytics',
        icon: 'pi pi-fw pi-comments',
        items: [
          {
            label: 'Dashboard',
            routerLink: "social-media/dashboard",
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Campaign Analysis',
            routerLink: "social-media/campaign-analysis",
            icon: 'pi pi-fw pi-chart-line',
          },
          {
            label: 'Platform Insights',
            routerLink: "social-media/platform-insights",
            icon: 'pi pi-fw pi-desktop',
          },
          {
            label: 'Settings',
            routerLink: 'social-media/settings',
            icon: 'pi pi-fw pi-sliders-h',
          }
        ]
      },
      {
        label: 'App Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
            routerLink: 'app-settings/users'
          },
          {
            label: 'Permissions',
            icon: 'pi pi-fw pi-unlock',
            // routerLink: 'app-settings/permissions'
          },
          {
            label: 'Role Management',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: 'app-settings/role-management'
          }
        ]
      },

    ];
  }
}
