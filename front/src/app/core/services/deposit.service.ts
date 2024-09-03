import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private apiUrl = 'http://localhost:4000/transaction';

  constructor(private http: HttpClient) { }

  deposit(amount: number): Observable<any> {
    const url = `${this.apiUrl}/deposit`;
    const token = localStorage.getItem('authToken');


    if (!token) {
      console.error('Token not found in cookies!');
      // Handle the missing token case (e.g., redirect to login)
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, { amount }, { headers: headers, withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getBalance(): Observable<any> {
    const url = `${this.apiUrl}/balance`;
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not found in localStorage!');
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(url, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('Unauthorized error:', error);
    } else {
      console.error('Deposit error:', error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

