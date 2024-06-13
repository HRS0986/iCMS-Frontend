import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {apiEndpoint} from "../config";

@Injectable({
  providedIn: 'root'
})
export class UserDataService{

  apiUrl = `${apiEndpoint}`;
  // getData() {
  //   return [
  //     {
  //       id: 1000,
  //       name: 'James Butt',
  //       email: 'ffasdf@fdg.com',
  //       roles: ['admin', 'editor'],
  //       // status: 'online'
  //     },
  //     {
  //       id: 1001,
  //       name: 'Josephine Darakjy',
  //       email: 'sgj@sdfg.com',
  //       roles: ['admin'],
  //       // status: 'offline'
  //     },
  //     {
  //       id: 1002,
  //       name: 'Art Venere',
  //       email: 'jdhfgoiuh@hujdhsfg.com',
  //       roles: ['editor'],
  //       // status: 'online'
  //     },
  //     {
  //       id: 1003,
  //       name: 'Lenna Paprocki',
  //       email: 'asidfha@hadfhg.com',
  //       roles: ['admin'],
  //       // status: 'offline'
  //     },
  //     {
  //       id: 1004,
  //       name: 'Donette Foller',
  //       email: 'asdjfioas@klja.com',
  //       roles: ['editor'],
  //       // status: 'online'
  //     },


  //   ];
  // }

  users: {username: string, email: string, profileImage: string}[] = [];

  constructor(private http: HttpClient) {}


  // getCustomersMini() {
  //   return Promise.resolve(this.getData().slice(0, 5));
  // }

  // getCustomersSmall() {
  //   return Promise.resolve(this.getData().slice(0, 10));
  // }

  // getCustomersMedium() {
  //   return Promise.resolve(this.getData().slice(0, 50));
  // }

  // getCustomersLarge() {
  //   return Promise.resolve(this.getData().slice(0, 200));
  // }

  // getCustomersXLarge() {
  //   return Promise.resolve(this.getData());
  // }

  // getCustomers(params?: any) {
  //   return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
  // }

  getUsers(token: string) {
    // console.log(token);
    let headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this.http.get<any>(this.apiUrl+'/getAllUsers', {headers});

  }

  getUsersNames(token: string) {
    // console.log(token);
    let headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this.http.get<any>(this.apiUrl+'/getAllUsersNames', {headers});
  }

  deleteUser(token: string, username: string) {
    let headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this.http.delete<any>(this.apiUrl+'/deleteUser/'+username, {headers});

  }

}
