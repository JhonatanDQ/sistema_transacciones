import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import TransferComponent_1 from "../transfer/transfer.component";
import DepositComponent from "../deposit/deposit.component";
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import BalanceComponent from '../balance/balance.component';
import { BalanceService } from '../../core/services/balance.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterLink, CommonModule, TransferComponent_1, DepositComponent,RouterOutlet, BalanceComponent],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent implements OnInit {

  showCards: boolean = true;
  currentBalance: number = 0;


  constructor(private router: Router, private BalanceService: BalanceService) {
    // Detect route changes to hide/show cards
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Show cards only when on the main dashboard route
        this.showCards = event.urlAfterRedirects === '/dashboard';
      }
    });
  }

      ngOnInit() {
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

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
