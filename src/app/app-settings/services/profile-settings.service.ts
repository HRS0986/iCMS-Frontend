import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  private apiUrl = 'http://localhost:8000/uploadProfileImage';
  constructor( private http: HttpClient) { }





}
