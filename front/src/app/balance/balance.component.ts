import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
})


export class BalanceComponent implements OnInit {
  balance: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/balance').subscribe(
      (response: any) => {
        this.balance = response.balance;
      },
      (error) => {
        console.error('Error al obtener el saldo:', error);
      }
    );
  }
}
