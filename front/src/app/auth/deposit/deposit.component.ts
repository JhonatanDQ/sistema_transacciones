// deposit.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  standalone: true,
  imports: [CommonModule],
})

export class DepositComponent {
  amount: number = 0;

  constructor(private http: HttpClient) {}

  deposit() {
    if (this.amount <= 0) {
      swal('Error', 'El monto debe ser positivo.', 'error');
      return;
    }

    this.http.post('/api/deposit', { amount: this.amount }).subscribe(
      (response: any) => {
        swal('Éxito', `Depósito exitoso. Nuevo saldo: ${response.balance}`, 'success');
      },
      (error) => {
        swal('Error', error.error.message, 'error');
      }
    );
  }
}
