import { Routes } from '@angular/router';
import { TransaccionesComponent } from './auth/transacciones/pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/pages/login/login.component';
import { RegisterComponent } from './auth/register/pages/register/register.component';


export const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: TransaccionesComponent},
  {path: "", redirectTo: "login", pathMatch: "full"}
];

