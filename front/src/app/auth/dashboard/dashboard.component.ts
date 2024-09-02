import { Component } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransferComponent } from "../transfer/transfer.component";
import { DepositComponent } from "../deposit/deposit.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BalanceComponent, SidebarComponent, RouterLink, CommonModule, TransferComponent, DepositComponent],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent {}
