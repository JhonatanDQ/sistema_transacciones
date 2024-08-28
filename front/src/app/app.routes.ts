import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// export const routes: Routes = [
//   {
//     path: 'auth',
//     loadComponent: () => import('./auth/login/login.component'),
//     children: [
//       {
//         path: 'login',
//         title: 'Login',
//         loadComponent: () => import('./auth/login/login.component'),
//       },
//       {
//         path: 'register',
//         title: 'Register',
//         loadComponent: () => import('./auth/register/register.component'),
//       },
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//     ],
//   },

//   {
//     path: 'dashboard',
//     loadComponent: () => import('./auth/dashboard/dashboard.component'),
//     children: [

//     ]
//   },

//   { path: '', redirectTo: 'auth', pathMatch: 'full' },
// ];

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
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
