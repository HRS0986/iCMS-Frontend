import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  private apiUrl = 'http://43.205.91.82:8000/uploadProfileImage';
  constructor( private http: HttpClient) { }





}
