import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../core/services/balance.service'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-balance',
  standalone: true,
  templateUrl: './balance.component.html',
  // styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balance: number = 0;
  accountEnding: string = '****';

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.loadBalance();
  }

  loadBalance(): void {
    this.balanceService.getBalance().subscribe({
      next: (data) => {
        this.balance = data.balance;
      },
      error: (err) => {
        console.error('Error fetching balance:', err);
      }
    });

    // this.balanceService.getBalance().subscribe({
    //   next: (data) => {
    //     this.balance = data.balance; // Ajusta según la estructura de tu respuesta de API
    //     this.accountEnding = data.accountEnding; // Ajusta según la estructura de tu respuesta de API
    //   },
    //   error: (err) => {
    //     console.error('Error fetching balance:', err);
    //   }
    // });
  // }

  }
}
