import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserDataService}  from "../../services/user-data.service";
import {User} from "../../domain/types"
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { UserRefreshService } from '../../services/user-refresh.service';
import {MessageService, ConfirmationService} from "primeng/api";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [MessageService, ConfirmationService]
})


export class UsersComponent implements OnInit{

  @ViewChild('splitButton') splitButton!: ElementRef;

  users: User[] =[];
  selectedUsers!: User;
  searchValue: string = '';
  breadcrumbItems: MenuItem[] = [
    {label: "Profile"},
    {label: 'Users'}
  ];
  userData!: {Username: string, UserAttributes: {Name: string, Value: string}[], Enabled: boolean, UserCreateDate: string, UserLastModifiedDate: string, UserStatus: string, UserMFASettingList: string[], roles: string[]}|null;
  userRoles: string[] = [];
  userProfileImage: string = '';


  actions!: MenuItem[];
  viewUserPopUpVisible: boolean = false

  constructor(
    private customerService: UserDataService,
    private authService: AuthenticationService,
    private userRefreshService: UserRefreshService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    // this.customerService.getCustomersMini().then(users => this.users = users);
    this.userRefreshService.userAdded.subscribe(() => {
      this.getUsers();
    });
    this.getUsers()

    this.actions = [
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          console.log("Viewing role");
          if(this.selectedUsers) {
            this.viewUser();
          }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No user selected'});
          }
        }
      },
      { label: "Update",
        icon: "pi pi-pencil",
        command: () => {
          console.log("Updating role");
        }
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: (event ) => {
          console.log("Deleting role");
          console.log(event);
          if(this.selectedUsers) {
            this.confirm();
          }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No user selected'});
          }

        }
      },
    ];

  }

  getSeverity(status: string) {
    switch (status) {
      case 'online':
        return 'success';

      case 'offline':
        return 'danger';

      default:
        return 'unknown';
    }
  }
 getRoleColor(role: string) {
    return rolesColors[role];
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
  addMember() {
    console.log('Add member');


  }

  deleteUser(user:User) {
    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.deleteUser(token, this.selectedUsers.username).subscribe(
        (data: any) => {
          console.log(data);
          // this.users = this.users.filter(user => user.username !== this.selectedUsers.username);
          this.getUsers();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User Deleted Successfully'});
        },
        (error: any) => {
          // Handle the error case
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete user'});
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
      this.customerService.getUser(token, this.selectedUsers.username).subscribe( (data: any) => {
        console.log(data);
        this.userData = data;
        this.userRoles = this.selectedUsers.groups;
        this.userProfileImage = data.UserAttributes.find((attr: any) => attr.Name === 'custom:profile_image')?.Value || '';

        this.viewUserPopUpVisible = true;
      }
      );

    });
  }


  getUsers() {

    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.getUsers(token).subscribe((data: any) => {
        this.users = data;
      });
    });

  }


}

//create testing user sample
// const users: User[] = [
//   {id: 1, name: 'John Doe', email: 'afdsg@gmai.com', roles: ['admin'], status: 'online'},
//   {id: 2, name: 'Jane Doe', email: 'dfgidhfg@idgh.com', roles: ['marketing'], status: 'offline'},
//   {id: 3, name: 'John Smith', email: 'gioefhg@ohg.com', roles: ['admin', 'customer service'], status: 'online'},
//   {id: 4, name: 'Jane Smith', email: 'uhihg@iuhh.com', roles: ['admin', 'marketing'], status: 'offline'},
//   {id: 5, name: 'John Johnson', email: 'faiohsgh@jetg.com', roles: ['customer service'], status: 'online'},
//   {id: 6, name: 'Jane Johnson', email: 'uahgd8@dfgsh.com', roles: ['admin','marketing'], status: 'offline'},
// ]

const rolesColors: {[key: string]: string} = {
  'admin': 'blue',
  'marketing': 'green',
  'customer service': 'yellow',
}






