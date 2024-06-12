import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiEndpoint} from "../config";

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  private apiUrl = `${apiEndpoint}/uploadProfileImage`;
  constructor( private http: HttpClient) { }





}
