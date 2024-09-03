import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert';
import { TransactionService } from '../../core/services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../core/services/balance.service';


@Component({
  selector: 'app-transfer',
  standalone: true,
  templateUrl: './transfer.component.html',
  imports: [FormsModule, CommonModule]
})
export default class TransferComponent implements OnInit{
  amount: number = 0;
  recipientDocument: string = '';
  currentBalance: number = 0;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(private transactionService: TransactionService, private BalanceService: BalanceService) {}
  ngOnInit(): void {
    this.fetchBalance();
  }

  fetchBalance() {
    this.BalanceService.getBalance().subscribe(
      (response) => {
        this.currentBalance = response.balance;
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  transfer() {
    if (this.amount <= 0) {
      Swal('Error', 'El monto debe ser positivo.', 'error');
      return;
    }

    this.transactionService.transfer(this.amount, this.recipientDocument)
      .subscribe({
        next: (response: any) => {
          Swal('Éxito', `Transferencia exitosa. Nuevo saldo: ${response.balance}`, 'success');
          // You might want to reset the form here:
          this.amount = 0;
          this.recipientDocument = '';
        },
        error: (error) => {
          // Handle errors gracefully, providing user-friendly messages
          Swal('Error', error.error.message || 'Error al procesar la transferencia', 'error');
        }
      });
  }
}
