import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service'; // Asegúrate de ajustar la ruta


@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',

})
export class DashboardComponent {
  balance: number = 0; // Mostrar el balance del usuario
  transactionAmount: number = 0; // Monto de la transacción

  constructor(private http: HttpClient, private authService: AuthService) {
    this.fetchBalance(); // Obtener el balance al inicializar el componente
  }

  // Método para obtener el balance del usuario
  fetchBalance() {
    this.authService.getProtectedData('/api/balance')
    .subscribe(
      (data: any) => this.balance = data.balance, // Actualiza el balance con los datos recibidos
      (error) => console.error('Error fetching balance:', error) // Maneja los errores
    );
  }

  // Método para realizar un retiro
  withdraw() {
    this.makeTransaction('/api/withdraw', this.transactionAmount);
  }

  // Método para realizar un depósito
  deposit() {
    this.makeTransaction('/api/deposit', this.transactionAmount);
  }

  transfer() {
    // Aquí necesitarás lógica adicional para manejar la información del destinatario
    this.makeTransaction('/api/transfer', this.transactionAmount);

  }

  // Método para realizar una transacción
  private makeTransaction(endpoint: string, amount: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}` // Incluir el token JWT en el encabezado de la solicitud
    });

    this.http.post(endpoint, { amount }, { headers })
      .subscribe(
        () => {
          console.log('Transaction successful');
          this.fetchBalance(); // Actualizar el balance después de la transacción
          this.transactionAmount = 0; // Reiniciar el campo de entrada
        },
        (error) => console.error('Transaction error:', error) // Manejar errores de la transacción
      );
  }
}
