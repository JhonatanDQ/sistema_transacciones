import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import cookie from 'cookie';


@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private apiUrl = 'http://localhost:4000/transaction/balance';

  constructor(private http: HttpClient) {}

  getBalance(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });


    return this.http.get<any>(`${this.apiUrl}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  fetchData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('/balance', { headers });
  }
}
