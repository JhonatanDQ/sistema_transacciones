import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../app/core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  userForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {
    // Inicializar FormGroup con FormControl
    this.userForm = new FormGroup({
      documento: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  clickLogin(): void {
    if (this.userForm.invalid) {
      // Validar errores de campo
      if (this.documentField.hasError('required')) {
        Swal.fire('Error', 'El documento es requerido', 'error');
      } else if (this.documentField.hasError('pattern')) {
        Swal.fire('Error', 'El documento debe contener solo números', 'error');
      } else if (this.passwordField.hasError('required')) {
        Swal.fire('Error', 'La contraseña es requerida', 'error');
      } else if (this.passwordField.hasError('minlength')) {
        Swal.fire(
          'Error', 'La contraseña debe tener al menos 8 caracteres', 'error');
      }
      else if (this.documentField.hasError('minlength')) {
        Swal.fire('Error', 'El documento debe tener al menos 10 caracteres', 'error');
      }
      else if (this.documentField.hasError && this.passwordField.hasError('required')){
        Swal.fire('Error', 'El documento y la contraseña son requeridos', 'error');
      }
      else {
        Swal.fire('Error', 'Completa todos los campos correctamente', 'error');
      }
      return;
    }

    // Llamar al servicio de login
    this.loginService
      .loginUser({
        documento: this.userForm.value.documento || '',
        contrasena: this.userForm.value.contrasena || '',
      })
      .subscribe({
        next: (response) => {
          if (response && response.token) {
            this.loginService.saveToken(response.token);
            Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
            this.router.navigate(['/dashboard']);
          }
          else {
            this.errorMessage =
              'Error al iniciar sesión: Respuesta inválida del servidor';
            Swal.fire('Error', this.errorMessage, 'error');
          }
        },
        error: (error) => {
          this.errorMessage = `Error al iniciar sesión: ${error.message || error}`;
          Swal.fire('Error', 'Error al iniciar sesión', 'error');
        },
      });
  }

  // Getters para los campos del formulario
  get documentField(): FormControl {
    return this.userForm.get('documento') as FormControl;
  }

  get passwordField(): FormControl {
    return this.userForm.get('contrasena') as FormControl;
  }
}
