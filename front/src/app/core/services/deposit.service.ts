// deposit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private apiUrl = 'http://localhost:4000/transaction';


  constructor(private http: HttpClient) { }

  deposit(amount: number): Observable<any> {
    const url = `${this.apiUrl}/deposit`; // Adjust the endpoint if needed
    return this.http.post(url, { amount });
  }
}
