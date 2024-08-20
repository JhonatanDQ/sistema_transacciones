import { Routes } from '@angular/router';
import { TransaccionesComponent } from './auth/transacciones/pages/transacciones/transacciones.component';
import { LoginComponent } from './auth/login/pages/login/login.component';
import { RegisterComponent } from './auth/register/pages/register/register.component';


export const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "transacciones", component: TransaccionesComponent},
  {path: "", redirectTo: "login", pathMatch: "full"}
];

