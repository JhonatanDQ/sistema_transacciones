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




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterLink, CommonModule, TransferComponent_1, DepositComponent, RouterOutlet, TransactionHistoryComponent],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent implements OnInit {

  showCards: boolean = true;
  currentBalance: number = 0;
  lastRecipient: string = 'asd1'; // Nombre del último destinatario
  lastAmount: string = '$0'; // Monto de la última transferencia
  user: any = {};


  constructor(private router: Router,
     private BalanceService: BalanceService,
     private AuthService: AuthService,
     private userService: UserService // Inject UserService

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

       // Función para obtener la información del usuario
       fetchUser() {
        this.userService.getUserInfo().subscribe(
          (response) => {
            this.user = response;
            console.log("User data:", this.user); // Log the fetched user data
          },
          (error) => {
            console.error('Error fetching user info:', error);
            // Handle error appropriately
          }
        );
      }


  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
