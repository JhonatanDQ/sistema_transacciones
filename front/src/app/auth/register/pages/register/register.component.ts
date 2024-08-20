import { Component, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { crossmPasswordMatchingValidator, PasswordStateMatcher } from './custom-validators';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  PasswordStateMatcher = new PasswordStateMatcher()

    private readonly _FormBuilder = inject(FormBuilder);

    formGroup = this._FormBuilder.nonNullable.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      documento: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required]
    }, {validators:crossmPasswordMatchingValidator})


  clickRegister(): void {
// console.log(this.formGroup.get('nombre')?.value)
    const nombre = this.formGroup.controls.nombre.value
    console.log(nombre)

    console.log(this.formGroup.controls.nombre.valid)
  }


  get namesField (): FormControl{
    return this.formGroup.controls.nombre
  }

  get lastNameField(): FormControl{
    return this.formGroup.controls.apellido
  }
  get userField(): FormControl{
    return this.formGroup.controls.usuario
  }
  get documentField(): FormControl{
    return this.formGroup.controls.documento
  }
  get passwordField (): FormControl{
    return this.formGroup.controls.contrasena
  }
  get confirmPasswordField(): FormControl{
    return this.formGroup.controls.confirmarContrasena
  }


}
