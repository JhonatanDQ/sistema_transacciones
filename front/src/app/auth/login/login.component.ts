import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import swal from 'sweetalert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../app/core/services/login.service';
import RegisterComponent from '../register/register.component';
import DashboardComponent from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RegisterComponent,
    DashboardComponent
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  userForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {
    this.userForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  clickLogin(): void {

    if (!this.userForm.valid) {
      swal('Error', 'Completa todos los campos correctamente', 'error');
      return;
    }

    this.loginService.loginUser(this.userForm.value).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.loginService.saveToken(response.token);
          swal('Éxito', 'Inicio de sesión exitoso', 'success');
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Error al iniciar sesión: Respuesta inválida del servidor';
          swal('Error', this.errorMessage, 'error');
        }
      },
      error: (error) => {
        this.errorMessage = `Error al iniciar sesión: ${error}`;
        swal('Error', this.errorMessage, 'error');
        console.error('Login error:', error);
      },
    });
  }
}
