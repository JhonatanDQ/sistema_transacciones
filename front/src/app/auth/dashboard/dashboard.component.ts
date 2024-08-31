import { Component } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BalanceComponent, SidebarComponent, RouterLink],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent {}
