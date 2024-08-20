import { Component, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  crossmPasswordMatchingValidator,
  PasswordStateMatcher,
} from './custom-validators';
import swal from 'sweetalert';
import { RegisterService } from '../../../services/register.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  PasswordStateMatcher = new PasswordStateMatcher();

  private readonly _FormBuilder = inject(FormBuilder);
  // private readonly _UsuariosApiService= inject (UsuariosApiService, {optional: true})

  formGroup = this._FormBuilder.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    documento: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  constructor(private registerservice: RegisterService) {}

  clickRegister(): void {
    if (!this.formGroup.valid) {
      swal('Error', 'Formulario invalido', 'error');
    } else {
      this.registerservice
        .registerUser(this.formGroup.value)
        .then((response) => {
          if (!response) {
            swal('Error', 'Error al registrar usuario', 'error');
          } else {
            swal('Exito', 'Usuario registrado con exito', 'success');
          }
        });
    }
  }

  get namesField(): FormControl {
    return this.formGroup.controls.nombre;
  }

  get lastNameField(): FormControl {
    return this.formGroup.controls.apellido;
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
