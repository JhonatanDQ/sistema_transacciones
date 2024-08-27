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
import { PasswordStateMatcher } from './custom-validators';
import Swal from 'sweetalert2'; // Cambio a sweetalert2
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { RegisterService } from '../../../app/core/services/register.service';
import LoginComponent from '../login/login.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    LoginComponent
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  PasswordStateMatcher = new PasswordStateMatcher();

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly registerService = inject(RegisterService); // Inyección del servicio
  private readonly router = inject(Router); // Inyección del router

  formGroup = this._FormBuilder.nonNullable.group({
    usuario: ['', Validators.required],
    documento: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  clickRegister(): void {
    if (!this.formGroup.valid) {
      Swal.fire('Error', 'Formulario inválido', 'error');
    } else {
      const password = this.formGroup.value.contrasena || '';
      const encryptedPass = CryptoJS.SHA256(password).toString();
      const formData = { ...this.formGroup.value, contrasena: encryptedPass };

      this.registerService
        .registerUser(formData)
        .then((response) => {
          if (!response) {
            Swal.fire('Error', 'Error al registrar usuario', 'error');
          } else {
            Swal.fire('Éxito', 'Usuario registrado con éxito', 'success');
            this.router.navigate(['/']);
          }
        })
        .catch((error) => {
          Swal.fire('Error', 'Error al registrar usuario', 'error');
          console.error('Registration error:', error);
        });
    }
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
