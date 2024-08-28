import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  providers: [TransactionService] // Proporciona el servicio aquí si es necesario
})
export class BalanceComponent implements OnInit {
  balance: number | null = null;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getBalance().subscribe({
      next: (balance: number) => {
        this.balance = balance;
      },
      error: (err: any) => {
        console.error('Error fetching balance:', err);
      }
    });
  }
}
