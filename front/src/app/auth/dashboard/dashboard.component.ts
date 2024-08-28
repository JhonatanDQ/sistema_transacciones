import { Component } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BalanceComponent],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent {}
