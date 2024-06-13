import {Component, OnInit} from '@angular/core';
import {UserDataService}  from "../../services/user-data.service";
import {User} from "../../domain/types"
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { UserRefreshService } from '../../services/user-refresh.service';
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent implements OnInit{
  users: User[] =[];
  selectedUsers!: User;
  searchValue: string = '';
  breadcrumbItems: MenuItem[] = [
    {label: "Profile"},
    {label: 'Users'}
  ];

  actions!: MenuItem[];

  constructor(
    private customerService: UserDataService,
    private authService: AuthenticationService,
    private userRefreshService: UserRefreshService,
    private messageService: MessageService
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
        command: () => {
          console.log("Deleting role");
          this.deleteUser();
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

  deleteUser() {
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


  getUsers() {

    this.authService.getIdToken().subscribe((token: any) => {
      this.customerService.getUsers(token).subscribe((data: any) => {
        this.users = data;
      });
    });

  }

  protected readonly console = console;
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






