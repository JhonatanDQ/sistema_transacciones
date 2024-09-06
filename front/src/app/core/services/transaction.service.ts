import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

interface Transaction {
  id: number;
  userDocument: string;
  recipientDocument: string;
  amount: number;
  type: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  getLastTransfer(): Observable<{amount: string | number } | null> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{amount: string | number}>(`${this.apiUrl}/last-transfer`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error fetching last transfer:', error);
        return of(null);
      }),
    );


  }
  private apiUrl = 'http://localhost:4000/transaction';

  constructor(private http: HttpClient) { }

  getTransactionHistory(): Observable<Transaction[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Transaction[]>(`${this.apiUrl}/history`, { headers });
  }

  getLastDeposit(): Observable<{ amount: string | number } | null> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ amount: string | number }>(`${this.apiUrl}/last-deposit`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching last deposit:', error);
          return of(null);
        })
      );
  }

  getLastWithdrawal(): Observable <{amount: string | number} | null> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      });

    return this.http.get<{amount: string | number}>(`${this.apiUrl}/last-withdraw`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error fetching last withdrawal:', error);
        return of(null);
      })
    );

  }
}
