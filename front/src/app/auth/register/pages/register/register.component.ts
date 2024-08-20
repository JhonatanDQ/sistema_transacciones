import { Component, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { crossmPasswordMatchingValidator, PasswordStateMatcher } from './custom-validators';
import axios from 'axios';
// import { ErrorStateMatcher } from '@angular/material/core';
import swal  from 'sweetalert';
// import { UsuariosApiService } from '../../../../services/usuarios-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  PasswordStateMatcher = new PasswordStateMatcher()

    private readonly _FormBuilder = inject(FormBuilder);
    // private readonly _UsuariosApiService= inject (UsuariosApiService, {optional: true})

    formGroup = this._FormBuilder.nonNullable.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      documento: ['', Validators.required],
      contrasena: ['', Validators.required],
    },)


  clickRegister(): void {

    axios.post('https://localhost:4000/users', this.formGroup)
      .then(response => {
        console.log('User registered successfully:', response.data);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });

    if(!this.formGroup.valid){
      swal("error!", "Complete los campos!", "error")
    } else {
      swal("Registrado!", "Se ha registrado!", "success")

    }

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

}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable()
// export class UsuariosApiService {

//   private apiUrl = 'http://localhost:4000/users';

//   constructor(private http: HttpClient) { }

//   registerUser(userData: any) {
//     return this.http.post(this.apiUrl, userData);
//   }
// }
