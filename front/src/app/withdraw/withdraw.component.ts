// withdraw.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
})
export class WithdrawComponent {
  amount: number = 0;

  constructor(private http: HttpClient) {}

  withdraw() {
    if (this.amount <= 0) {
      Swal('Error', 'El monto debe ser positivo.', 'error');
      return;
    }

    this.http.post('/withdraw', { amount: this.amount }).subscribe(
      (response: any) => {
        Swal('Éxito', `Retiro exitoso. Nuevo saldo: ${response.balance}`, 'success');
      },
      (error) => {
        Swal('Error', error.error.message, 'error');
      }
    );
  }
}
