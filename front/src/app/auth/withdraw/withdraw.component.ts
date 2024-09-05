import { Component, NgModule, OnInit } from '@angular/core';
import { WithdrawService } from '../../core/services/withdraw.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../../core/services/balance.service';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdraw.component.html',
})
export default class WithdrawComponent implements OnInit {
  amount: number = 0;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentBalance: number = 0;

  constructor(private withdrawService: WithdrawService, private BalanceService: BalanceService) {}

  ngOnInit(){
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

  makeWithdrawal(amount: number) {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.withdrawService.withdraw(amount).subscribe({
      next: (response) => {
        console.log('Withdrawal successful:', response);
        this.isLoading = false;
        this.amount = 0; // Reset the input field

        // Mostrar modal de éxito con Swal
        Swal.fire({
          icon: 'success',
          title: 'Retiro exitoso',
          text: 'Tu retiro ha sido procesado exitosamente!',
          confirmButtonText: 'OK'
        }).then(() => {
          // Recargar la página
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Withdrawal error:', error);
        this.isLoading = false;

        if (error.status === 401) {
          // Manejar el error de no autorizado
          Swal.fire('Error', 'No autorizado. Por favor, inicia sesión.', 'error');
        } else {
          this.errorMessage = 'Error al procesar el retiro';
          Swal.fire('Error', this.errorMessage, 'error');
        }
      }
    });
  }
}
