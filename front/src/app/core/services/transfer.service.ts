import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:4000/transfer'; // Assuming this is your backend base URL

  constructor(private http: HttpClient) {}

  transfer(amount: number, recipientDocument: string): Observable<any> {
    const url = `${this.apiUrl}/transfer`;
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not found in localStorage!');
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, { amount, recipientDocument }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Centralized error handling (can be expanded for more specific cases)
    if (error.status === 401) {
      console.error('Unauthorized error:', error);
      // Consider redirecting to login or handling token refresh
    } else {
      console.error('Transaction error:', error);
    }
    return throwError(error.error.message || 'Something went wrong. Please try again later.');
  }
}
