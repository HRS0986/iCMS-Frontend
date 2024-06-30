// import { Component, ElementRef, OnInit, ViewChild, SimpleChanges } from '@angular/core';
// import { UserDataService } from '../../services/user-data.service';
// import { User } from '../../domain/types';
// import { Table } from 'primeng/table';
// import { MenuItem } from 'primeng/api';
// import { AuthenticationService } from '../../../auth/services/authentication.service';
// import { UserRefreshService } from '../../services/user-refresh.service';
// import { MessageService, ConfirmationService } from 'primeng/api';
// import { UserUpdateService } from '../../services/user-update.service';
//
// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrl: './users.component.scss',
//   providers: [MessageService, ConfirmationService]
// })
// export class UsersComponent implements OnInit {
//   @ViewChild('splitButton') splitButton!: ElementRef;
//
//   isLoading: boolean = true;
//   timestamp!: number;
//   users: User[] = [];
//   selectedUsers!: User;
//   searchValue: string = '';
//   breadcrumbItems: MenuItem[] = [
//     { label: 'Profile' },
//     { label: 'Users' }
//   ];
//   userData!: { Username: string, UserAttributes: { Name: string, Value: string }[], Enabled: boolean, UserCreateDate: string, UserLastModifiedDate: string, UserStatus: string, UserMFASettingList: string[], roles: string[] } | null;
//   userRoles: string[] = [];
//   userProfileImage: string = '';
//
//   actions!: MenuItem[];
//   viewUserPopUpVisible: boolean = false;
//
//   constructor(
//     private customerService: UserDataService,
//     private authService: AuthenticationService,
//     private userRefreshService: UserRefreshService,
//     private messageService: MessageService,
//     private confirmationService: ConfirmationService,
//     private userUpdateService: UserUpdateService
//   ) { }
//
//   ngOnInit() {
//     this.selectedUsers = {} as User;
//     this.isLoading = true;
//     this.userRefreshService.userAdded.subscribe(() => {
//       this.getUsers();
//     });
//     this.userRefreshService.userUpdated.subscribe(() => {
//       this.getUsers();
//     });
//
//     this.getUsers();
//
//     this.updateActions();
//
//     //clear selected user
//
//
//     this.timestamp = Date.now();
//   }
//
//
//   addMember() {
//     console.log('Add member');
//   }
//
//   deleteUser(user: User) {
//     this.authService.getIdToken().subscribe((token: any) => {
//       this.customerService.deleteUser(token, this.selectedUsers.username).subscribe(
//         (data: any) => {
//           console.log(data);
//           this.getUsers();
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully' });
//         },
//         (error: any) => {
//           console.log(error);
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
//         }
//       );
//     });
//   }
//
//   confirm() {
//     console.log('confirm');
//     this.confirmationService.confirm({
//       header: 'Are you sure?',
//       message: 'Please confirm to proceed.',
//       accept: () => {
//         this.deleteUser(this.selectedUsers);
//       },
//       reject: () => {
//         this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
//       }
//     });
//   }
//
//   viewUser() {
//     this.authService.getIdToken().subscribe((token: any) => {
//       this.customerService.getUser(token, this.selectedUsers.username).subscribe((data: any) => {
//         console.log(data);
//         this.userData = data;
//         this.userRoles = this.selectedUsers.groups;
//         this.userProfileImage = data.UserAttributes.find((attr: any) => attr.Name === 'custom:profile_image')?.Value || '';
//
//         this.viewUserPopUpVisible = true;
//       });
//     });
//   }
//
//   updateUser() {
//     if (this.selectedUsers) {
//       this.authService.getIdToken().subscribe((token: any) => {
//         this.customerService.getUser(token, this.selectedUsers.username).subscribe(
//           (data: any) => {
//             console.log(data);
//             this.userUpdateService.userToUpdate.next(data);
//           },
//           (error: any) => {
//             console.log(error);
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get user details' });
//           }
//         );
//       });
//     } else {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
//     }
//   }
//
//   getUsers() {
//     this.isLoading = true;
//     this.authService.getIdToken().subscribe((token: any) => {
//       this.customerService.getUsers(token).subscribe((data: any) => {
//         this.users = data;
//         console.log(this.users);
//         this.isLoading = false;
//       });
//     });
//   }
//
//   getProfileImageUrl() {
//     return `${this.userProfileImage}?${this.timestamp}`;
//   }
//
//   disableUser() {
//     this.authService.getIdToken().subscribe((token: any) => {
//       this.customerService.disableUser(token, this.selectedUsers.username).subscribe(
//         (data: any) => {
//           console.log(data);
//           this.getUsers();
//           this.selectedUsers = {} as User;
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Disabled Successfully' });
//         },
//         (error: any) => {
//           console.log(error);
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to disable user' });
//         }
//       );
//     });
//   }
//
//   enableUser() {
//     this.authService.getIdToken().subscribe((token: any) => {
//       this.customerService.enableUser(token, this.selectedUsers.username).subscribe(
//         (data: any) => {
//           console.log(data);
//           this.getUsers();
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Enabled Successfully' });
//         },
//         (error: any) => {
//           console.log(error);
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to enable user' });
//         }
//       );
//     });
//   }
//
//   updateActions() {
//     const userSelected = !!this.selectedUsers;
//     this.actions = [
//       {
//         label: 'View',
//         icon: 'pi pi-eye',
//         command: () => {
//           console.log('Viewing role');
//           if (this.selectedUsers) {
//             this.viewUser();
//           } else {
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
//           }
//         },
//         disabled: !userSelected
//       },
//       {
//         label: 'Update',
//         icon: 'pi pi-pencil',
//         command: () => {
//           console.log('Updating role');
//           if (this.selectedUsers) {
//             this.updateUser();
//           } else {
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
//           }
//         },
//         disabled: !userSelected
//       },
//       {
//         label: 'Delete',
//         icon: 'pi pi-trash',
//         command: (event) => {
//           console.log('Deleting role');
//           console.log(event);
//           if (this.selectedUsers) {
//             this.confirm();
//           } else {
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
//           }
//         },
//         disabled: !userSelected
//       },
//       {
//         label: 'Disable',
//         icon: 'pi pi-ban',
//         command: () => {
//           console.log('Disabling user');
//           if (this.selectedUsers && this.selectedUsers.status) {
//             this.disableUser();
//           } else {
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected or user is already disabled' });
//           }
//         },
//         disabled: !this.selectedUsers || !this.selectedUsers.status
//       },
//       {
//         label: 'Enable',
//         icon: 'pi pi-check',
//         command: () => {
//           console.log('Enabling user');
//           if (this.selectedUsers && !this.selectedUsers.status) {
//             this.enableUser();
//           } else {
//             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected or user is already enabled' });
//           }
//         },
//         disabled: !this.selectedUsers || this.selectedUsers.status
//       }
//     ];
//   }
// }


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../domain/types';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { UserRefreshService } from '../../services/user-refresh.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserUpdateService } from '../../services/user-update.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit {
  @ViewChild('splitButton') splitButton!: ElementRef;

  isLoading: boolean = true;
  timestamp!: number;
  users: User[] = [];
  selectedUsers!: User;
  searchValue: string = '';
  breadcrumbItems: MenuItem[] = [
    { label: 'Profile' },
    { label: 'Users' }
  ];
  userData!: { Username: string, UserAttributes: { Name: string, Value: string }[], Enabled: boolean, UserCreateDate: string, UserLastModifiedDate: string, UserStatus: string, UserMFASettingList: string[], roles: string[] } | null;
  userRoles: string[] = [];
  userProfileImage: string = '';

  actions!: MenuItem[];
  viewUserPopUpVisible: boolean = false;
  permissions: string[] = [];

  constructor(
    private customerService: UserDataService,
    private authService: AuthenticationService,
    private userRefreshService: UserRefreshService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userUpdateService: UserUpdateService
  ) { }

  ngOnInit() {
    this.selectedUsers = {} as User;
    this.isLoading = true;
    this.userRefreshService.userAdded.subscribe(() => {
      this.getUsers();
    });
    this.userRefreshService.userUpdated.subscribe(() => {
      this.getUsers();
    });

    this.getUsers();

    this.authService.permissions$.subscribe(permissions => {
      this.permissions = permissions;
      this.updateActions();
    });

    //clear selected user
    this.timestamp = Date.now();
  }

  addMember() {
    console.log('Add member');
  }

  deleteUser(user: User) {
    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.deleteUser(token, this.selectedUsers.username).subscribe(
        (data: any) => {
          console.log(data);
          this.getUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully' });
        },
        (error: any) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
        }
      );
    });
  }

  confirm() {
    console.log('confirm');
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.deleteUser(this.selectedUsers);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  viewUser() {
    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.getUser(token, this.selectedUsers.username).subscribe((data: any) => {
        console.log(data);
        this.userData = data;
        this.userRoles = this.selectedUsers.groups;
        this.userProfileImage = data.UserAttributes.find((attr: any) => attr.Name === 'custom:profile_image')?.Value || '';

        this.viewUserPopUpVisible = true;
      });
    });
  }

  updateUser() {
    if (this.selectedUsers) {
      this.authService.getIdToken().subscribe((token: any) => {
        this.customerService.getUser(token, this.selectedUsers.username).subscribe(
          (data: any) => {
            console.log(data);
            this.userUpdateService.userToUpdate.next(data);
          },
          (error: any) => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get user details' });
          }
        );
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
    }
  }

  getUsers() {
    this.isLoading = true;
    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.getUsers(token).subscribe((data: any) => {
        this.users = data;
        console.log(this.users);
        this.isLoading = false;
      });
    });
  }

  getProfileImageUrl() {
    return `${this.userProfileImage}?${this.timestamp}`;
  }

  disableUser() {
    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.disableUser(token, this.selectedUsers.username).subscribe(
        (data: any) => {
          console.log(data);
          this.getUsers();
          this.selectedUsers = {} as User;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Disabled Successfully' });
        },
        (error: any) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to disable user' });
        }
      );
    });
  }

  enableUser() {
    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.enableUser(token, this.selectedUsers.username).subscribe(
        (data: any) => {
          console.log(data);
          this.getUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Enabled Successfully' });
        },
        (error: any) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to enable user' });
        }
      );
    });
  }

  updateActions() {
    const userSelected = !!this.selectedUsers;

    this.actions = [
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => {
          console.log('Viewing user');
          if (this.selectedUsers) {
            this.viewUser();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
          }
        },
        disabled: !this.hasPermission('View User') || !userSelected
      },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          console.log('Updating user');
          if (this.selectedUsers) {
            this.updateUser();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
          }
        },
        disabled: !this.hasPermission('Edit User') || !userSelected
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          console.log('Deleting user');
          if (this.selectedUsers) {
            this.confirm();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
          }
        },
        disabled: !this.hasPermission('Delete User') || !userSelected
      },
      {
        label: 'Disable',
        icon: 'pi pi-ban',
        command: () => {
          console.log('Disabling user');
          if (this.selectedUsers && this.selectedUsers.status) {
            this.disableUser();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected or user is already disabled' });
          }
        },
        disabled: !this.hasPermission('Disable User') || !this.selectedUsers || !this.selectedUsers.status
      },
      {
        label: 'Enable',
        icon: 'pi pi-check',
        command: () => {
          console.log('Enabling user');
          if (this.selectedUsers && !this.selectedUsers.status) {
            this.enableUser();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected or user is already enabled' });
          }
        },
        disabled: !this.hasPermission('Enable User') || !this.selectedUsers || this.selectedUsers.status
      }
    ];
  }

  private hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
