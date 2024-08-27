// transfer.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert';

@Component({
  selector: 'app-transfer',
  standalone: true,
  templateUrl: './transfer.component.html',
  imports: []
  // styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  amount: number = 0;
  recipientDocument: string = '';

  constructor(private http: HttpClient) {}

  transfer() {
    if (this.amount <= 0) {
      Swal('Error', 'El monto debe ser positivo.', 'error');
      return;
    }

    this.http.post('/api/transfer', { amount: this.amount, recipientDocument: this.recipientDocument }).subscribe(
      (response: any) => {
        Swal('Éxito', `Transferencia exitosa. Nuevo saldo: ${response.balance}`, 'success');
      },
      (error) => {
        Swal('Error', error.error.message, 'error');
      }
    );
  }
}
