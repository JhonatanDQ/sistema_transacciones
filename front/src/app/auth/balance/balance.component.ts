import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../core/services/balance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './balance.component.html',
  // styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balance: number = 0; // Initialize balance to 0
  accountEnding: string = '****';
  isLoading: boolean = false; // Add a loading indicator

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.fetchBalance(); // Fetch balance when the component loads
  }

  fetchBalance(): void {
    this.isLoading = true; // Show loading indicator
    this.balanceService.getBalance().subscribe({
      next: (response) => {
        console.log('Balance response:', response); // Check the response
        if (response && typeof response.balance === 'number') {
          this.balance = response.balance;
        } else {
          console.error('Invalid balance response format:', response);
          // Handle the error appropriately (e.g., display an error message)
        }
        this.isLoading = false; // Hide loading indicator
      },
      error: (error) => {
        console.error('Error fetching balance:', error);
        this.isLoading = false; // Hide loading indicator
        // Handle the error appropriately (e.g., display an error message)
      }
    });
  }
}
