import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {
  private apiUrl = 'http://localhost:4000/transaction'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  withdraw(amount: number): Observable<any> {
    const url = `${this.apiUrl}/withdraw`;
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not found in localStorage!');
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, { amount }, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('Unauthorized error:', error);
      // Handle unauthorized error, maybe redirect to login
    } else {
      console.error('Withdraw error:', error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
