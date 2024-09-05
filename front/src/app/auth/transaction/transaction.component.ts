import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transfer.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

interface Transaction {
  id: number;
  userDocument: string;
  recipientDocument: string;
  amount: number;
  type: string;
  createdAt: Date;
}

@Component({
  selector: 'app-transaction-history',
  standalone:true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './transaction.component.html'
})

export class TransactionHistoryComponent implements OnInit {
  transactions: Transaction[] = [];
  currentPage = 1;   // Página actual
  itemsPerPage = 5;  // Número de elementos por página

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.fetchTransactionHistory();
  }

  fetchTransactionHistory() {
    this.transactionService.getTransactionHistory().subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      error: (error: any) => {
        console.error('Error fetching transaction history:', error);
      }
    });
  }
}
