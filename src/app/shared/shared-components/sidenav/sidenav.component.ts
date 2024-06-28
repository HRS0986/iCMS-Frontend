// import { Component, OnInit } from '@angular/core';
// import { MenuItem, PrimeIcons } from "primeng/api";
// import {AuthenticationService} from "../../../auth/services/authentication.service";
//
// @Component({
//   selector: 'app-sidenav',
//   templateUrl: './sidenav.component.html',
//   styleUrls: ["./sidenav.component.scss"]
// })
// export class SidenavComponent implements OnInit {
//   menuItems!: MenuItem[];
//   logoutItems!: MenuItem[];
//
//   constructor(private authService: AuthenticationService) {
//   }
//
//   ngOnInit() {
//     this.logoutItems = [
//       {
//         label: "Logout",
//         icon: "pi pi-fw pi-external-link",
//         routerLink: "auth/signout",
//       }
//     ];
//
//     this.menuItems = [
//       {
//         label: 'Dashboard',
//         icon: 'pi pi-fw pi-th-large',
//         routerLink: "main-dashboard"
//       },
//       {
//         label: 'Email Analytics',
//         icon: 'pi pi-fw pi-envelope',
//         items: [
//           {
//             label: 'Sentiments Dashboard',
//             routerLink: "email/dashboard1",
//             icon: 'pi pi-fw pi-desktop'
//           },
//           {
//             label: 'Insights Dashboard',
//             routerLink: "email/dashboard2",
//             icon: 'pi pi-fw pi-th-large'
//           },
//           {
//             label: 'Email Issues',
//             routerLink: "email/issues",
//             icon: 'pi pi-fw pi-flag'
//           },
//           {
//             label: 'Email Suggestions',
//             routerLink: "email/suggestions",
//             icon: 'pi pi-fw pi-star'
//           },
//           {
//             label: 'Email Inquiries',
//             routerLink: "email/inquiries",
//             icon: 'pi pi-fw pi-question'
//           },
//           {
//             label: '(temp) Email Filtering',
//             routerLink: "email/filtering",
//             icon: 'pi pi-fw pi-filter'
//           },
//           {
//             label: 'Conversation Summaries',
//             routerLink: "email/summaries",
//             icon: 'pi pi-fw pi-book'
//           },
//           {
//             label: 'Settings',
//             routerLink: "email/settings",
//             icon: 'pi pi-fw pi-sliders-h'
//           }
//         ]
//       },
//       {
//         label: 'Call Analytics',
//         icon: 'pi pi-fw pi-phone',
//         items: [
//           {
//             label: 'Dashboard',
//             routerLink: "call/dashboard",
//             icon: 'pi pi-fw pi-th-large'
//           },
//           {
//             label: 'Call Recordings',
//             routerLink: "call/recordings",
//             icon: 'pi pi-fw pi-volume-down'
//           },
//           {
//             label: 'Call Filtering',
//             routerLink: "call/filtering",
//             icon: 'pi pi-fw pi-filter',
//           },
//           {
//             label: 'Call Operators',
//             routerLink: 'call/operators',
//             icon: 'pi pi-fw pi-users',
//           },
//           {
//             label: 'Settings',
//             routerLink: 'call/settings',
//             icon: 'pi pi-fw pi-sliders-h'
//           }
//         ]
//       },
//       {
//         label: 'Social Media Analytics',
//         icon: 'pi pi-fw pi-comments',
//         items: [
//           {
//             label: 'Dashboard',
//             routerLink: "social-media/dashboard",
//             icon: 'pi pi-fw pi-th-large'
//           },
//           {
//             label: 'Campaign Analysis',
//             routerLink: "social-media/campaign-analysis",
//             icon: 'pi pi-fw pi-chart-line',
//           },
//           {
//             label: 'Platform Insights',
//             routerLink: "social-media/platform-insights",
//             icon: 'pi pi-fw pi-desktop',
//           },
//           {
//             label: 'Settings',
//             routerLink: 'social-media/settings',
//             icon: 'pi pi-fw pi-sliders-h',
//           }
//         ]
//       },
//       {
//         label: 'App Settings',
//         icon: 'pi pi-fw pi-cog',
//         items: [
//           {
//             label: 'Users',
//             icon: 'pi pi-fw pi-users',
//             routerLink: 'app-settings/users'
//           },
//           {
//             label: 'Permissions',
//             icon: 'pi pi-fw pi-unlock',
//             // routerLink: 'app-settings/permissions'
//           },
//           {
//             label: 'Role Management',
//             icon: 'pi pi-fw pi-user-edit',
//             routerLink: 'app-settings/role-management'
//           }
//         ]
//       },
//
//     ];
//   }
//
//
//
//
// }


import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  menuItems: MenuItem[] = [];
  logoutItems: MenuItem[] = [];
  permissions: string[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.logoutItems = [
      {
        label: "Logout",
        icon: "pi pi-fw pi-external-link",
        routerLink: "auth/signout",
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
          // {
          //   label: 'Sentiments Dashboard',
          //   routerLink: "email/dashboard1",
          //   icon: 'pi pi-fw pi-desktop'
          // },
          {
            label: 'Dashboard',
            routerLink: "email/dashboard2",
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Email Issues',
            routerLink: "email/issues",
            icon: 'pi pi-fw pi-flag'
          },
          {
            label: 'Email Inquiries',
            routerLink: "email/inquiries",
            icon: 'pi pi-fw pi-question'
          },
          {
            label: 'Email Suggestions',
            routerLink: "email/suggestions",
            icon: 'pi pi-fw pi-bolt'
          },
          {
            label: 'Thread Summaries',
            routerLink: "email/summaries",
            icon: 'pi pi-fw pi-link'
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
            routerLink: 'app-settings/users',
            disabled: false
          },
          {
            label: 'Role Management',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: 'app-settings/role-management',
            disabled: false
          },
          {
            label: 'Configurations',
            icon: 'pi pi-fw pi-cog',
            routerLink: 'app-settings/configurations',
            disabled: false

          }
        ]
      },
    ];

    this.authService.permissions$.subscribe(permissions => {
      this.permissions = permissions;
      this.updateMenuItems();
    });
  }

  getVisibility(route: string) {
    if (route === 'app-settings/users') {
      return this.permissions.includes('View Users');
    } else if (route === 'app-settings/role-management') {
      return this.permissions.includes('View Roles');
    } else if(route == 'app-settings/configurations'){
      return this.permissions.includes('View Config');
    }else{
      return true
    }
  }

  updateMenuItems() {
    this.menuItems.forEach(menuItem => {
      if (menuItem.items) {
        menuItem.items.forEach(subMenuItem => {
          subMenuItem.disabled = !this.getVisibility(subMenuItem.routerLink);
        });
      } else {
        menuItem.disabled = !this.getVisibility(menuItem.routerLink);
      }
    });
  }
}

