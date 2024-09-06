import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { RegisterService } from '../../../app/core/services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  private readonly _FormBuilder = inject(FormBuilder);

  constructor(private registerService: RegisterService, private router: Router) {}

  formGroup = this._FormBuilder.nonNullable.group({
    usuario: ['', Validators.required],
    documento: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
  });

  clickRegister(): void {
    if (this.formGroup.invalid) {
      if (this.passwordField.hasError('minlength')) {
        Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres', 'error');
      }
      else if (this.passwordField.hasError('required')) {
        Swal.fire('Error', 'La contraseña es requerida', 'error');
      }
      else if (this.documentField.hasError('required')) {
        Swal.fire('Error', 'El documento es requerido', 'error');
      }
      else if (this.documentField.hasError('pattern')) {
        Swal.fire('Error', 'El documento debe contener solo números', 'error');
      }
      else if (this.documentField.hasError('minlength')) {
        Swal.fire('Error', 'El documento debe tener al menos 10 caracteres', 'error');
      }
      else if (this.documentField.hasError('maxlength')) {
        Swal.fire('Error', 'El documento debe tener máximo 10 caracteres', 'error');
      }
      else if (this.userField.hasError('required')) {
        Swal.fire('Error', 'El usuario es requerido', 'error');
      }
      else {
        Swal.fire('Error', 'Completa todos los campos correctamente', 'error');
      }
      return;
    }

    const password = this.formGroup.value.contrasena || '';
    const encryptedPass = CryptoJS.SHA256(password).toString();
    const formData = { ...this.formGroup.value, contrasena: encryptedPass };

    this.registerService
      .registerUser(formData)
      .then((response) => {
        if (!response) {
          Swal.fire('Error', 'Error al registrar usuario', 'error');
        }
        else {
          Swal.fire('Éxito', 'Usuario registrado con éxito', 'success');
          this.router.navigate(['']);
        }
      })
      .catch((error) => {
        Swal.fire('Error', 'Error al registrar usuario', 'error');
        console.error('Registration error:', error);
      });
  }

  get userField(): FormControl {
    return this.formGroup.controls.usuario;
  }

  get documentField(): FormControl {
    return this.formGroup.controls.documento;
  }

  get passwordField(): FormControl {
    return this.formGroup.controls.contrasena;
  }
}
