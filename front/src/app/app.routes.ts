import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.default),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./auth/register/register.component'),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./auth/dashboard/dashboard.component'),

    children: [
      // {
      //   path: 'balance',
      //   title: 'Balance',
      //   loadComponent: () => import('./auth/balance/balance.component'),
      // },
      // {
      //   path: 'deposit',
      //   title: 'Deposit',
      //   loadComponent: () => import('../'),
      // },
    ]

  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];


export const appConfig = {
  providers: [
    provideHttpClient(),
  ]
};
