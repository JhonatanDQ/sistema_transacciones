import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/balance`);
  }

  withdraw(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdraw`, { amount });
  }

  deposit(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit`, { amount });
  }

  transfer(amount: number, recipientDocument: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, { amount, recipientDocument });
  }
}
