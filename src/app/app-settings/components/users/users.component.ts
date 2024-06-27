// import {Component, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
// import {UserDataService}  from "../../services/user-data.service";
// import {User} from "../../domain/types"
// import {Table} from "primeng/table";
// import {MenuItem} from "primeng/api";
// import { AuthenticationService } from '../../../auth/services/authentication.service';
// import { UserRefreshService } from '../../services/user-refresh.service';
// import {MessageService, ConfirmationService} from "primeng/api";
// import {UserUpdateService} from "../../services/user-update.service";
//
//
//
// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrl: './users.component.scss',
//   providers: [MessageService, ConfirmationService]
// })
//
//
// export class UsersComponent implements OnInit{
//
//   @ViewChild('splitButton') splitButton!: ElementRef;
//
//   isLoading: boolean = true;
//
//   timestamp!: number;
//
//   users: User[] =[];
//   selectedUsers!: User;
//   searchValue: string = '';
//   breadcrumbItems: MenuItem[] = [
//     {label: "Profile"},
//     {label: 'Users'}
//   ];
//   userData!: {Username: string, UserAttributes: {Name: string, Value: string}[], Enabled: boolean, UserCreateDate: string, UserLastModifiedDate: string, UserStatus: string, UserMFASettingList: string[], roles: string[]}|null;
//   userRoles: string[] = [];
//   userProfileImage: string = '';
//
//
//   actions!: MenuItem[];
//   viewUserPopUpVisible: boolean = false
//
//   constructor(
//     private customerService: UserDataService,
//     private authService: AuthenticationService,
//     private userRefreshService: UserRefreshService,
//     private messageService: MessageService,
//     private confirmationService: ConfirmationService,
//     private userUpdateService: UserUpdateService
//   ) {}
//
//   ngOnInit() {
//
//     //when user added or updated user list should be updated
//     this.isLoading = true;
//     this.userRefreshService.userAdded.subscribe(() => {
//       this.getUsers();
//     });
//     this.userRefreshService.userUpdated.subscribe(() => {
//       this.getUsers();
//     });
//
//     //get users
//     this.getUsers();
//
//     //actions for each user
//     this.actions = [
//       {
//         label: "View",
//         icon: "pi pi-eye",
//         command: () => {
//           console.log("Viewing role");
//           if(this.selectedUsers) {
//             this.viewUser();
//           }else{
//             this.messageService.add({severity:'error', summary: 'Error', detail: 'No user selected'});
//           }
//         }
//       },
//       { label: "Update",
//         icon: "pi pi-pencil",
//         command: () => {
//           console.log("Updating role");
//           if(this.selectedUsers) {
//             this.updateUser();
//           }else{
//             this.messageService.add({severity:'error', summary: 'Error', detail: 'No user selected'});
//
//           }
//         }
//       },
//       {
//         label: "Delete",
//         icon: "pi pi-trash",
//         command: (event ) => {
//           console.log("Deleting role");
//           console.log(event);
//           if(this.selectedUsers) {
//             this.confirm();
//           }else{
//             this.messageService.add({severity:'error', summary: 'Error', detail: 'No user selected'});
//           }
//
//         }
//       },
//       //disable user
//       {
//         label: "Disable",
//         icon: "pi pi-ban",
//         command: () => {
//           console.log("Disabling user");
//           if(this.selectedUsers && this.selectedUsers.status) {
//             this.disableUser();
//           }else{
//             this.messageService.add({severity:'error', summary: 'Error', detail: 'No user selected or user is already disabled'});
//           }
//         },
//         disabled: !this.selectedUsers || !this.selectedUsers.status
//       },
//       {
//         label: "Enable",
//         icon: "pi pi-check",
//         command: () => {
//           console.log("Enabling user");
//           if(this.selectedUsers && !this.selectedUsers.status) {
//             this.enableUser();
//           }else{
//             this.messageService.add({severity:'error', summary: 'Error', detail: 'No user selected or user is already enabled'});
//           }
//         },
//         disabled: !this.selectedUsers || this.selectedUsers.status
//       }
//     ];
//     this.timestamp = Date.now();
//
//
//   }
//
//
//
//   addMember() {
//     console.log('Add member');
//   }
//
//   deleteUser(user:User) {
//     this.authService.getIdToken().subscribe((token: any) => {
//       this.customerService.deleteUser(token, this.selectedUsers.username).subscribe(
//         (data: any) => {
//           console.log(data);
//           // this.users = this.users.filter(user => user.username !== this.selectedUsers.username);
//           this.getUsers();
//           this.messageService.add({severity:'success', summary: 'Success', detail: 'User Deleted Successfully'});
//         },
//         (error: any) => {
//           // Handle the error case
//           console.log(error);
//           this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete user'});
//         }
//
//       );
//     });
//
//   }
//
//     confirm() {
//         console.log('confirm');
//         this.confirmationService.confirm({
//             header: 'Are you sure?',
//             message: 'Please confirm to proceed.',
//             accept: () => {
//                 this.deleteUser(this.selectedUsers);
//             },
//             reject: () => {
//                 this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
//             }
//         });
//     }
//
//
//
//
//
//
//   viewUser() {
//     this.authService.getIdToken().subscribe((token: any) => {
//       this.customerService.getUser(token, this.selectedUsers.username).subscribe( (data: any) => {
//         console.log(data);
//         this.userData = data;
//         this.userRoles = this.selectedUsers.groups;
//         this.userProfileImage = data.UserAttributes.find((attr: any) => attr.Name === 'custom:profile_image')?.Value || '';
//
//         this.viewUserPopUpVisible = true;
//       }
//       );
//
//     });
//   }
//   updateUser() {
//     if(this.selectedUsers) {
//       this.authService.getIdToken().subscribe((token: any) => {
//         this.customerService.getUser(token, this.selectedUsers.username).subscribe(
//           (data: any) => {
//             console.log(data);
//             this.userUpdateService.userToUpdate.next(data); // Emit the event with the user data
//           },
//           (error: any) => {
//             console.log(error);
//             this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to get user details'});
//           }
//         );
//       });
//     } else {
//       this.messageService.add({severity: 'error', summary: 'Error', detail: 'No user selected'});
//     }
//   }
//
// getUsers() {
//   this.isLoading = true;
//   this.authService.getIdToken().subscribe((token: any) => {
//     this.customerService.getUsers(token).subscribe((data: any) => {
//       this.users = data;
//       console.log(this.users);
//       this.isLoading = false; // move this line here
//     });
//   });
// }
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
//           this.messageService.add({severity:'success', summary: 'Success', detail: 'User Disabled Successfully'});
//         },
//         (error: any) => {
//           // Handle the error case
//           console.log(error);
//           this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to disable user'});
//         }
//
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
//           this.messageService.add({severity:'success', summary: 'Success', detail: 'User Enabled Successfully'});
//         },
//         (error: any) => {
//           // Handle the error case
//           console.log(error);
//           this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to enable user'});
//         }
//
//       );
//     });
//   }
//
//
// }
//
//
//
//
//
//
//





import { Component, ElementRef, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../domain/types';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { UserRefreshService } from '../../services/user-refresh.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserUpdateService } from '../../services/user-update.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
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

    this.updateActions();

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
          console.log('Viewing role');
          if (this.selectedUsers) {
            this.viewUser();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
          }
        },
        disabled: !userSelected
      },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          console.log('Updating role');
          if (this.selectedUsers) {
            this.updateUser();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
          }
        },
        disabled: !userSelected
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          console.log('Deleting role');
          console.log(event);
          if (this.selectedUsers) {
            this.confirm();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No user selected' });
          }
        },
        disabled: !userSelected
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
        disabled: !this.selectedUsers || !this.selectedUsers.status
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
        disabled: !this.selectedUsers || this.selectedUsers.status
      }
    ];
  }
}
