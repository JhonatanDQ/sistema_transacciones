import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import TransferComponent_1 from "../transfer/transfer.component";
import DepositComponent from "../deposit/deposit.component";
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { BalanceService } from '../../core/services/balance.service';
import { AuthService } from '../../core/services/auth.service';
import { TransactionHistoryComponent } from "../transaction/transaction.component";
import { UserService } from './../../core/services/user.service';
import { TransactionService } from '../../core/services/transaction.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,
     RouterLink,
     CommonModule,
     TransferComponent_1,
     DepositComponent,
     RouterOutlet,
     TransactionHistoryComponent],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent implements OnInit {

  showCards: boolean = true;
  currentBalance: number = 0;
  lastRecipient: string | undefined ; // Nombre del último destinatario
  lastTransfer: string | number = 0; // Monto de la última transferencia
  user: any = {};
  lastDeposit: string | number = 0;
  lastWithdraw: string | number = 0;

  constructor(private router: Router,
     private BalanceService: BalanceService,
     private AuthService: AuthService,
     private userService: UserService, // Inject UserService
     private transactionService: TransactionService

    ) {
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
        this.fetchUser();
        this.getLastDeposit();
        this.getLastWithdraw();
        this.getLastTransfer();
      }

      getLastDeposit() {
        this.transactionService.getLastDeposit().subscribe(
          (response: { amount: string | number } | null) => {
            if (response) {
              this.lastDeposit = response.amount;
            } else {
              this.lastDeposit = 0;
            }
          },);
      }

      getLastWithdraw() {
        this.transactionService.getLastWithdrawal().subscribe(
          (response: { amount: string | number } | null) => {
            if (response) {
              this.lastWithdraw = response.amount;
            } else {
              this.lastWithdraw = 0;
            }
          },);
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

       fetchUser() {
        this.userService.getUserInfo().subscribe(
          (response) => {
            this.user = response;
          },
          (error) => {
            console.error('Error fetching user info:', error);
          }
        );
      }

      getLastTransfer() {
        this.transactionService.getLastTransfer().subscribe(
          (response: { amount: string | number } | null) => {
            if (response) {
              this.lastTransfer = response.amount;
            } else {
              this.lastTransfer = 0;
            }
          },);
      }



  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
