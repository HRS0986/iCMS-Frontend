import { Component } from '@angular/core';
import {UserDataService}  from "../../services/user-data.service";
import {User} from "../../domain/types"
import {Table} from "primeng/table";
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent {
  users: User[] =[];
  selectedUsers: User[] = [];
  breadcrumbItems: MenuItem[] = [
    {label: "Profile"},
    {label: 'Users'}
  ];

  constructor(private customerService: UserDataService) {}

  ngOnInit() {
    // this.customerService.getCustomersMini().then(users => this.users = users);
    this.users = users;
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
  }
  addMember() {
    console.log('Add member');
  }
}

//create testing user sample
const users: User[] = [
  {id: 1, name: 'John Doe', email: 'afdsg@gmai.com', roles: ['admin'], status: 'online'},
  {id: 2, name: 'Jane Doe', email: 'dfgidhfg@idgh.com', roles: ['marketing'], status: 'offline'},
  {id: 3, name: 'John Smith', email: 'gioefhg@ohg.com', roles: ['admin', 'customer service'], status: 'online'},
  {id: 4, name: 'Jane Smith', email: 'uhihg@iuhh.com', roles: ['admin', 'marketing'], status: 'offline'},
  {id: 5, name: 'John Johnson', email: 'faiohsgh@jetg.com', roles: ['customer service'], status: 'online'},
  {id: 6, name: 'Jane Johnson', email: 'uahgd8@dfgsh.com', roles: ['admin','marketing'], status: 'offline'},
]

const rolesColors: {[key: string]: string} = {
  'admin': 'blue',
  'marketing': 'green',
  'customer service': 'yellow',
}

