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
import {
  PasswordStateMatcher,
} from './custom-validators';
import swal from 'sweetalert';
import { RegisterService } from '../../../services/register.service';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';
// import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  PasswordStateMatcher = new PasswordStateMatcher();

  private readonly _FormBuilder = inject(FormBuilder);

  formGroup = this._FormBuilder.nonNullable.group({
    // nombre: ['', Validators.required],
    // apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    documento: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  constructor(private registerservice: RegisterService, private router: Router) {}

  clickRegister(): void {
    if (!this.formGroup.valid) {
      swal('Error', 'Formulario invalido', 'error');
    } else {

      const password = this.formGroup.value.contrasena || '';
      const encryptedPass = CryptoJS.SHA256(
        password
      ).toString();
    const formData = {...this.formGroup.value, contrasena: encryptedPass};
      // console.log(formData)

      this.registerservice
        .registerUser(formData)
        .then((response) => {
          if (!response) {
            swal('Error', 'Error al registrar usuario', 'error');
          } else {
            swal('Exito', 'Usuario registrado con exito', 'success');
            this.router.navigate(['/']);
          }
        });
    }
  }

  // get namesField(): FormControl {
  //   return this.formGroup.controls.nombre;
  // }

  // get lastNameField(): FormControl {
  //   return this.formGroup.controls.apellido;
  // }
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
