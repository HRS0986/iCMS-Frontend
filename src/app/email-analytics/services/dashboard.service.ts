import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { DashboardInquiryData, DashboardIssueData, DashboardSentimentData, DashboardSuggestionData, DashboardSmallCardData } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private getRandomNumber(min: number, max: number, no_of_decimals: number): number {
    return Math.round(10**no_of_decimals*(Math.random() * (max - min) + min))/10**no_of_decimals;
  }
  
  private convertToDashboardIssueData(response: any): DashboardIssueData {
    return {
      timeUpdated: new Date(),
      newIssues: Math.round(Math.random() * 10000),
      avgIssuePercentage: this.getRandomNumber(-100, 100, 2)
    }
  }
  private convertToDashboardInquiryData(response: any): DashboardInquiryData {
    return {
      timeUpdated: new Date(),
      newInquiries: Math.round(Math.random() * 10000),
      avgInquiryPercentage: this.getRandomNumber(-100, 100, 2)
    }
  }
  private convertToDashboardSuggestionData(response: any): DashboardSuggestionData {
    return {
      timeUpdated: new Date(),
      newSuggestions: Math.round(Math.random() * 10000),
      avgSuggestionPercentage: this.getRandomNumber(-100, 100, 2)
    }
  }
  private convertToDashboardSentimentData(response: any): DashboardSentimentData {
    return {
      timeUpdated: new Date(),
      currentSentimentScore: this.getRandomNumber(-1, 1, 2),
      avgSentimentPercentage: this.getRandomNumber(-100, 100, 2)
    }
  }
  private convertToDashboardSmallCardData(response: any): DashboardSmallCardData {
    return {
      timeUpdated: new Date(),
      new: this.getRandomNumber(1, 10000, 0),
      total: this.getRandomNumber(1000, 100000, 0),
      avg: this.getRandomNumber(1, 1000, 2),
      avgPercentage: this.getRandomNumber(-100, 100, 2)
    }
  }
  private timeoutDuration = 10000; // Timeout duration in milliseconds

  getDashboardIssueData(): Observable<DashboardIssueData> {
    return this.http
      .get<any>('https://dummyjson.com/products?limit=10&skip=0')
      .pipe(
        map(this.convertToDashboardIssueData),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later." + e.message));
          }
        })
      ); // BUG: remove map part in production
  }

  getDashboardInquiriesData(): Observable<DashboardInquiryData> {
    return this.http
      .get<any>('https://dummyjson.com/products?limit=10&skip=0')
      .pipe(
        map(this.convertToDashboardInquiryData),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );  // BUG: remove map part in production
  }

  getDashboardSuggestionsData(): Observable<DashboardSuggestionData> {
    return this.http
      .get<any>('https://dummyjson.com/products?limit=10&skip=0')
      .pipe(
        map(this.convertToDashboardSuggestionData),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      ); // BUG: remove map part in production
  }

  getDashboardSentimentData(): Observable<DashboardSentimentData> {
    return this.http
      .get<any>('https://dummyjson.com/products?limit=10&skip=0')
      .pipe(
        map(this.convertToDashboardSentimentData),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );  // BUG: remove map part in production
  }

  getDashboardSmallCardData(): Observable<DashboardSmallCardData> {
    return this.http
      .get<any>('https://dummyjson.com/products?limit=10&skip=0')
      .pipe(
        map(this.convertToDashboardSmallCardData),
        timeout(this.timeoutDuration),
        catchError(e => {
          if (e.name === 'TimeoutError') {
            return throwError(() => new Error("Request timed out. Please try again later."));
          } else {
            return throwError(() => new Error("Unknown error has occured. Please try again later."));
          }
        })
      );  // BUG: remove map part in production
  }

}
