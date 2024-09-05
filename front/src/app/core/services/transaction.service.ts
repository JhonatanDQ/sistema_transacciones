import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:4000/transaction';

  constructor(private http: HttpClient) { }

  getTransactionHistory(): Observable<Transaction[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Transaction[]>(`${this.apiUrl}/history`, { headers });
  }
}
