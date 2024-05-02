import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiResponse, CallSettingsDetails } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CallSettingsService {
  constructor(private http: HttpClient) {}

  API_ROOT = 'http://127.0.0.1:8000';

  public getNotificationSettings(userId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.API_ROOT}/get-notification-settings/${userId}`
    );
  }

  public saveNotificationSettings(
    settings: CallSettingsDetails
  ): Promise<ApiResponse> {
    return firstValueFrom(
      this.http.post<ApiResponse>(
        this.API_ROOT + '/add-notification-settings',
        settings
      )
    );
  }

  public updateNotificationSettings(
    settings: CallSettingsDetails
  ): Promise<ApiResponse> {
    return firstValueFrom(
      this.http.post<ApiResponse>(
        this.API_ROOT + '/update-notification-settings',
        settings
      )
    );
  }
}
