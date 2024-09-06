import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:4000/user'; // Adjust if your backend endpoint is different

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/info`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
