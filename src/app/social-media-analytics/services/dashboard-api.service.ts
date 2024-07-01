// src\app\social-media-analytics\services\pi-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private apiUrl = 'http://127.0.0.1:8000/social-media';

  constructor(private http: HttpClient) {}

}
