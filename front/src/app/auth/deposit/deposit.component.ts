import { Component, OnInit } from '@angular/core';
import { DepositService } from '../../core/services/deposit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BalanceService } from '../../core/services/balance.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deposit.component.html',
})
export default class DepositComponent implements OnInit {
  depositAmount: number = 0;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentBalance: number | null = null;

  constructor(private depositService: DepositService, private BalanceService: BalanceService) { }

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
        // Handle the error appropriately (e.g., display an error message)
      }
    );
  }

  deposit(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    // Validaciones antes de realizar el depósito
    if (this.depositAmount <= 0) {
      Swal.fire('Error', 'El monto del depósito debe ser mayor que cero.', 'error');
      this.isLoading = false;
      return;
    }

    if (isNaN(this.depositAmount)) {
      Swal.fire('Error', 'Ingresa un monto numérico válido.', 'error');
      this.isLoading = false;
      return;
    }

    this.depositService.deposit(this.depositAmount).subscribe({
      next: (response) => {
        console.log('Deposit response:', response);
        this.isLoading = false;
        this.depositAmount = 0; // Reset the input field

        // Obtener el saldo actual
        this.depositService.getBalance().subscribe({
          next: (balanceResponse) => {
            this.currentBalance = balanceResponse.balance;
          },
          error: (error) => {
            console.error('Error fetching balance:', error);
            this.currentBalance = null; // Handle balance fetch error
          }
        });

        // Mostrar modal de éxito con Swal
        Swal.fire({
          icon: 'success',
          title: 'Depósito exitoso',
          text: `Tu depósito ha sido procesado exitosamente. Saldo actual: ${this.currentBalance ? this.currentBalance : 'No disponible'}`,
          confirmButtonText: 'OK'
        }).then(() => {
          // Recargar la página
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Error making deposit:', error);
        this.isLoading = false;

        if (error.status === 401) {
          // Manejar el error de no autorizado
          Swal.fire('Error', 'No autorizado. Por favor, inicia sesión.', 'error');
        } else {
          this.errorMessage = 'Error al procesar el depósito';
          Swal.fire('Error', this.errorMessage, 'error');
        }

      }
    });
  }


}
