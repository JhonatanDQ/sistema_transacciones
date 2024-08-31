import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import cookie from 'cookie';


@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private apiUrl = 'http://localhost:4000/transaction';

  constructor(private http: HttpClient) {}

  getBalance(): Observable<any> {
    const token = cookie.parse(document.cookie)['authToken'];
    console.log(token);

    return this.http.get<any>(`${this.apiUrl}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
