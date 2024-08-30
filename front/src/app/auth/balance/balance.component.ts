import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  providers: [TransactionService]
})
export class BalanceComponent {

  balance = 0
  
}
