import { Component } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BalanceComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent {}
