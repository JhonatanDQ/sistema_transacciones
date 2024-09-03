import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./auth/login/login.component') },
      { path: 'register', loadComponent: () => import('./auth/register/register.component') },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./auth/dashboard/dashboard.component'),
    children: [
      { path: 'balance', loadComponent: () => import('./auth/balance/balance.component') },
      { path: 'deposit', loadComponent: () => import('./auth/deposit/deposit.component') },
      { path: 'withdraw', loadComponent: () => import('./auth/withdraw/withdraw.component') },
      { path: 'transfer', loadComponent: () => import('./auth/transfer/transfer.component') },
      // { path: 'profile', loadComponent: () => import('./profile/profile.component') },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
