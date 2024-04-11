import { Component } from '@angular/core';
import {UserDataService}  from "../../services/user-data.service";
import {User} from "../../domain/types"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] =[];
  selectedUsers: User[] = [];

  constructor(private customerService: UserDataService) {}

  ngOnInit() {
    this.customerService.getCustomersMini().then(users => this.users = users);
  }


}
