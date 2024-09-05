import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'; // Importa desde sweetalert2
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../core/services/balance.service';
import { TransactionService } from '../../core/services/transfer.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-transfer',
  standalone: true,
  templateUrl: './transfer.component.html',
  imports: [FormsModule, CommonModule]
})
export default class TransferComponent implements OnInit {
  amount: number = 0;
  recipientDocument: string = '';
  currentBalance: number = 0;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  userDocument: string = '';


  constructor(
    private transactionService: TransactionService,
    private balanceService: BalanceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchBalance();
  }

  fetchBalance() {
    this.balanceService.getBalance().subscribe(
      (response) => {
        this.currentBalance = response.balance;
      },
      (error) => {
        console.error('Error fetching balance:', error);
        Swal.fire('Error', 'No se pudo obtener el saldo', 'error');
      }
    );
  }

  transfer() {
    if (this.amount <= 0) {
      Swal.fire('Error', 'El monto debe ser positivo.', 'error');
      return;
    }

    if (this.recipientDocument === this.userDocument) {
      Swal.fire('Error', 'No puedes transferirte a ti mismo.', 'error');
      return;
    }

    if (this.amount > this.currentBalance) {
      Swal.fire('Error', 'Fondos insuficientes.', 'error');
      return;
    }

    this.transactionService.transfer(this.amount, this.recipientDocument)
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `Transferencia exitosa. Nuevo saldo: ${response.balance}`,
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
          this.amount = 0;
          this.recipientDocument = '';
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Error al procesar la transferencia';
          Swal.fire('Error', errorMessage, 'error');
          this.isLoading = false;
        }
      });
  }
}
